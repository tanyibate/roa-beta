import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import pool from "../../../postgres.config";
const bcrypt = require("bcrypt");
import axios from "axios";

const providers = [
  Providers.Credentials({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: "Credentials",
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const result = await axios.post(
        `${process.env.NEXTAUTH_URL}/api/nextlogin`,
        {
          email: credentials.email,
          password: credentials.password,
        }
      );
      const user = result.data;
      if (user) {
        console.log(user);
        // Any user object returned here will be saved in the JSON Web Token
        return user;
      } else {
        return null;
      }
    },
  }),
  Providers.Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
  Providers.Email({
    server: {
      host: "email-smtp.us-east-2.amazonaws.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
    from: "noreply@rogueonarrival.com",
  }),
];

const options = {
  providers,
  callbacks: {
    async jwt(token, user) {
      // Add access_token to the token right after signin
      if (user) {
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  database: {
    name: "default",
    type: "postgres",
    url:
      "postgres://rswhaddtauirhr:731aa3056571735c91969a186d53aaa8dae106059f806a08e8676ccee30911dc@ec2-54-74-77-126.eu-west-1.compute.amazonaws.com:5432/d1a1kten5cckoa",
    ssl: true,
    synchronize: false,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

export default (req, res) => NextAuth(req, res, options);

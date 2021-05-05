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
  /*Providers.Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),*/
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
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
  },
  providers,
  theme: "dark",
  events: {
    async createUser(message) {
      /* user created */
      axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/welcome`, {
        email: message.email,
      });
    },
  },
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
    url: process.env.DATABASE_URL,
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

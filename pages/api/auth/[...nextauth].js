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
  database:
    "postgres://jnogzitlovusmz:141dec94d96c480b938e7c8e234ebd4f69ba203966e9dc4e3ca047a7cb8b231a@ec2-176-34-222-188.eu-west-1.compute.amazonaws.com:5432/d8ipf54rndhvv",
};

export default (req, res) => NextAuth(req, res, options);

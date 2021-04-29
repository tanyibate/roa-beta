import pool from "../../postgres.config";
import { getSession } from "next-auth/client";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [session.user.email],
      (error, results) => {
        if (error) {
          console.log(error);
        }
        const user = results.rows[0];
        delete user.password;
        const tokenContent = {
          email: user.email,
          name: user.first_name + " " + user.last_name,
          sub: user.id,
          iat: Math.round(new Date().getTime() / 1000), // token issue time
          exp: Math.round(new Date().getTime() / 1000) + 60, // token expiration time
          username: user.username,
        };
        const accessToken = jwt.sign(tokenContent, process.env.TRIBE_SSO_KEY, {
          algorithm: "HS256",
        });

        res.status(200).json({ token: accessToken });
      }
    );
  } else res.status(401).send("not logged in");
};

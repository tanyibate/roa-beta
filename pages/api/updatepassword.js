// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool from "../../postgres.config";
import { getSession, session } from "next-auth/client";

export default async (req, res) => {
  const authSession = await getSession({ req });
  if (authSession) {
    const { password } = req.body;
    if (req.method === "PUT") {
      pool
        .query("SELECT password FROM users WHERE email = $1", [
          authSession.user.email,
        ])
        .then((results) => {
          if (results.rows.length) {
            if (results.rows[0].password === password) {
              pool
                .query("UPDATE users SET password = $1  email = $2", [
                  password,
                  authSession.user.email,
                ])
                .then(() => {
                  res.status(200).json({ updated: true });
                })
                .catch(() => {
                  res.status(200).json({ updated: false });
                });
            } else res.status(200).json({ updated: false });
          } else res.status(200).json({ updated: false });
        });
    } else res.status(200).json({ updated: false });
  } else res.status(200).json({ updated: false });
};

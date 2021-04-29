// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool from "../../postgres.config";
import { getSession, session } from "next-auth/client";

export default async (req, res) => {
  const authSession = await getSession({ req });
  if (authSession) {
    const {
      username,
      email,
      first_name,
      last_name,
      city,
      country,
      phone_number,
    } = req.body;
    if (req.method === "PUT") {
      pool
        .query(
          "UPDATE users SET username = $1, email = $2, first_name = $3, last_name = $4, phone_number = $5, city = $6, country = $7 WHERE email = $8",
          [
            username,
            email,
            first_name,
            last_name,
            phone_number,
            city,
            country,
            authSession.user.email,
          ]
        )
        .then(() => {
          res.status(200).json({ updated: true });
        })
        .catch(() => {
          res.status(200).json({ updated: false });
        });
    }
  }
};

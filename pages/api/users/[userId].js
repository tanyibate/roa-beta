import pool from "../../../postgres.config";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    pool.query(
      "SELECT users.level, FROM users WHERE id = (SELECT id from users WHERE email = $1)",
      [session.user.email],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows[0]);
      }
    );
  } else res.status(401).send("not logged in");
};

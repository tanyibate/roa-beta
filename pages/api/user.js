import pool from "../../postgres.config";
import { getSession } from "next-auth/client";

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
        delete results.rows[0].password;
        const user = results.rows[0];
        res.status(200).json(user);
      }
    );
  } else res.status(401).send("not logged in");
};

import pool from "../../../postgres.config";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const { artist_alias } = req.body;

  if (session) {
    pool.query(
      "SELECT * FROM artists WHERE id = (SELECT id from artists WHERE artist_alias = $1)",
      [artist_alias.replace("%20", " ")],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  } else res.status(401).send("not logged in");
};

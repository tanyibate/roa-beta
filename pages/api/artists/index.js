import { getSession } from "next-auth/client";
import pool from "../../../postgres.config";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    if (req.method === "GET") {
      pool.query("SELECT * FROM artists ORDER BY id ASC", (error, results) => {
        if (results) {
          res.status(200).json(results.rows);
        } else {
          res.status(400);
        }
      });
    } else {
      response.status(400);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
};

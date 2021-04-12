import { getSession } from "next-auth/client";
import pool from "../../../postgres.config";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    if (req.method === "GET") {
      pool.query(
        "SELECT * FROM (SELECT COUNT(artist_id) AS total_slices,COUNT(user_id) AS purchased_slices,artist_id FROM slices GROUP BY artist_id) AS foo INNER JOIN artists ON foo.artist_id = artists.id",
        (error, results) => {
          if (results) {
            res.status(200).json(results.rows);
          } else {
            res.status(400);
          }
        }
      );
    } else {
      response.status(400);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
};

import { getSession } from "next-auth/client";
import pool from "../../../../postgres.config";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    if (req.method === "GET") {
      pool.query(
        "Select * FROM (SELECT  slices.user_id,  artists.artist_alias, artists.artist_slice_image_url FROM users INNER JOIN slices ON  slices.user_id = users.id INNER JOIN artists ON  artists.id = slices.artist_id ) AS foo WHERE user_id = (SELECT id FROM users WHERE email = $1)",
        [session.user.email],
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

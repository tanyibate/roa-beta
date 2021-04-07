import { getSession } from "next-auth/client";
import pool from "../../postgres.config";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    if (req.method === "GET") {
      pool.query(
        "SELECT boo.level,boo.referral_code, foo.slice_count FROM (SELECT level,referral_code FROM users WHERE id=(SELECT id FROM users WHERE email = $1)) AS boo,(SELECT COUNT(user_id) AS slice_count FROM slices WHERE user_id=(SELECT id FROM users WHERE email = $1)) AS foo",
        [session.user.email],
        (error, results) => {
          if (results) {
            res.status(200).json(results.rows);
          } else {
            console.log("123");
            res.status(400);
          }
        }
      );
    } else {
      response.status(405);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
};

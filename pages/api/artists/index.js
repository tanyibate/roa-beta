import { getSession } from "next-auth/client";
import pool from "../../../postgres.config";

/*export default async (request, response) => {
  const session = await getSession({ request });
  if (session) {
    if (request.method === "GET") {
      pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
        if (results) {
          response.status(200).json(results.rows);
        } else {
          response.status(400);
        }
      });
    }
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    console.log("failed");

    response.status(401);
  }
  response.end();
};*/

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

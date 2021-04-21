import pool from "../../postgres.config";

export default function (request, response) {
  if (request.method === "POST") {
    var username = request.body.username;
    if (username) {
      pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        function (error, results, fields) {
          if (results.rows.length > 0) {
            response
              .status(200)
              .json({ valid: false, message: "username already present" });
          } else {
            response.status(200).json({ valid: true });
          }
        }
      );
    } else
      response
        .status(403)
        .json({ valid: false, message: "username not supplied" });
  } else response.send(400);
}

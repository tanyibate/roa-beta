import pool from "../../postgres.config";

export default function (request, response) {
  if (request.method === "POST") {
    var email = request.body.email;
    if (email) {
      pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
        function (error, results, fields) {
          if (results.rows.length > 0) {
            response
              .status(200)
              .json({ valid: false, message: "Email already present" });
          } else {
            response.status(200).json({ valid: true });
          }
        }
      );
    } else
      response
        .status(403)
        .json({ valid: false, message: "Email not supplied" });
  } else response.send(400);
}

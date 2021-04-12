import pool from "../../postgres.config";

export default function (request, response) {
  if (request.method === "POST") {
    var phone_number = request.body.phone_number;
    if (phone_number) {
      pool.query(
        "SELECT * FROM users WHERE phone_number = $1",
        [phone_number],
        function (error, results, fields) {
          if (results.rows.length > 0) {
            response
              .status(200)
              .json({ valid: false, message: "phone number already present" });
          } else {
            response.status(200).json({ valid: true });
          }
        }
      );
    } else
      response
        .status(403)
        .json({ valid: false, message: "phone number not supplied" });
  } else response.send(400);
}

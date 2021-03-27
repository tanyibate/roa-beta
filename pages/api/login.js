import pool from "../../postgres.config";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default function (request, response) {
  if (request.method === "POST") {
    var email = request.body.email;
    var password = request.body.password;
    if (email && password) {
      pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
        function (error, results, fields) {
          if (results.rows.length > 0) {
            bcrypt.compare(
              password,
              results.rows[0].password,
              async function (err, res) {
                console.log(res);
                if (res === true) {
                  const user = { email: email, id: results.rows[0].id };
                  const accessToken = jwt.sign(
                    user,
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "10m" }
                  );
                  const refreshToken = jwt.sign(
                    user,
                    process.env.REFRESH_TOKEN_SECRET
                  );
                  const refreshtoken_json = refreshToken;
                  pool.query(
                    "INSERT INTO refreshtokens (refresh_token,user_id) VALUES ($1,$2)",
                    [refreshtoken_json, results.rows[0].id],
                    (error, results) => {
                      if (error) {
                        response.status(400);
                        response.end();
                      }
                      response.status(200).json({ accessToken, refreshToken });
                      response.end();
                    }
                  );
                } else {
                  response.status(403);
                  response.end();
                }
              }
            );
          } else {
            response.status(403);
            response.end();
          }
        }
      );
    } else {
      response.status(403);
      response.end();
    }
  } else {
    response.status(403);
    response.end();
  }
}

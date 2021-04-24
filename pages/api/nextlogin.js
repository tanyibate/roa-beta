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
          if (error) {
            response.status(403);
            response.end();
          }
          if (results.rows.length > 0) {
            bcrypt.compare(
              password,
              results.rows[0].password,
              async function (err, res) {
                if (res === true) {
                  const user = results.rows[0];
                  delete user.password;
                  const tokenContent = {
                    email: user.email,
                    name: user.first_name + " " + user.last_name,
                    sub: user.id,
                  };
                  const accessToken = jwt.sign(
                    tokenContent,
                    process.env.TRIBE_SSO_KEY
                  );
                  user.accessToken = accessToken;

                  response.status(200).json(user);
                  response.end();
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

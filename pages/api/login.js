import pool from "../../postgres.config";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default (request, response) => {
  var email = request.body.email;
  var password = request.body.password;
  if (email && password) {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      function (error, results, fields) {
        bcrypt.compare(password, results.rows[0].password, function (err, res) {
          if (res === true) {
            const user = { email: email };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            response.json(accessToken);
          } else response.sendStatus(403);
          response.end();
        });
      }
    );
  } else {
    response.sendStatus(403);
    response.end();
  }
};

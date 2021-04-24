import pool from "../../postgres.config";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default (req, res) => {
  const { email, token, password } = req.body;
  pool
    .query(
      "SELECT * FROM password_reset_tokens WHERE user_id = (SELECT id FROM users where email = $1) and token = $2",
      [email, token]
    )
    .then((results) => {
      if (results.rows.length > 0) {
        const expirty_time = results.rows[0].expiry_time;
        var d = new Date();
        var n = d.getTime();
        if (n < parseInt(expirty_time)) {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              pool
                .query("UPDATE users SET password = $1 WHERE email = $2", [
                  hash,
                  email,
                ])
                .then(() => {
                  res.status(200).json({
                    message: "password has succesfully been reset",
                    error: false,
                  });
                })
                .catch((err) => {
                  res.status(200).json({
                    message:
                      "There has been an error, click on the button below to send a new email",
                    error: true,
                  });
                });
            });
          });
        } else {
          res.status(200).json({
            message:
              "The link has expired, click on the button below to send a new email",
            error: true,
          });
        }
      } else {
        res.status(200).json({
          message:
            "invalid link, click on the button below to send a new email",
          error: true,
        });
      }
    });
};

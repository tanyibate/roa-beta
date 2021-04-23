import pool from "../../postgres.config";
import axios from "axios";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default async function (request, response) {
  if (request.method === "POST") {
    const {
      email,
      password,
      first_name,
      last_name,
      phone_number,
      referral_code,
      username,
      recaptchaResponse,
    } = request.body;
    let recaptchaSuccess = false;
    try {
      console.log(recaptchaResponse);
      let recaptchaSuccessData = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`
      );
      console.log(recaptchaSuccessData.data.success);
      recaptchaSuccess = recaptchaSuccessData.data.success;
    } catch (err) {
      console.log(err);
      recaptchaSuccess = false;
    }

    if (
      username &&
      email &&
      first_name &&
      last_name &&
      phone_number &&
      password &&
      recaptchaSuccess
    ) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.
          const starterLevel = 0;
          pool.query(
            "INSERT INTO users (email,password,first_name,last_name,phone_number,level,username) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING id",
            [
              email,
              hash,
              first_name,
              last_name,
              phone_number,
              starterLevel,
              username,
            ],
            async (error, results) => {
              if (error) {
                response.status(400).send("Registration failed try again");
              } else {
                if (referral_code) {
                  pool.query(
                    "UPDATE users SET level = level + 1 WHERE id = (SELECT id FROM users WHERE referral_code = $1)",
                    [referral_code]
                  );
                }
                axios
                  .post(
                    `${process.env.NEXT_PUBLIC_APP_URL}/api/welcome`,
                    {
                      email: email,
                    },
                    {
                      timeout: "3000",
                    }
                  )
                  .then((res) => {})
                  .catch((err) => {});
                response
                  .status(201)
                  .send(`User added with ID: ${results.rows[0].id}`);
              }
            }
          );
        });
      });
    } else {
      response.status(400).send("Registration failed try again");
    }
  } else {
    response.status(403);
  }
}

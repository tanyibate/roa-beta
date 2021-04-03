import pool from "../../postgres.config";
const bcrypt = require("bcrypt");

export default function (request, response) {
  if (request.method === "POST") {
    if (request.method === "POST") {
      const {
        email,
        password,
        first_name,
        last_name,
        phone_number,
      } = request.body;

      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.
          const starterLevel = 1;
          pool.query(
            "INSERT INTO users (email,password,first_name,last_name,phone_number,level) VALUES ($1, $2, $3, $4, $5,$6) RETURNING id",
            [email, hash, first_name, last_name, phone_number, starterLevel],
            (error, results) => {
              if (error) {
                throw error;
              }
              response
                .status(201)
                .send(`User added with ID: ${results.rows[0].id}`);
            }
          );
        });
      });
    }
  } else {
    response.status(403);
  }
}

import pool from "../../../postgres.config";
import { authenticate } from "../../../api-assets/authenticateUser";

const bcrypt = require("bcrypt");
const saltRounds = 10;

export default authenticate(
  process.env.ACCESS_TOKEN_SECRET,
  (request, response, decoded) => {
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
          pool.query(
            "INSERT INTO users (email,password,first_name,last_name,phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [email, hash, first_name, last_name, phone_number],
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
    if (request.method === "GET") {
      pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
        if (error) {
          throw error;
        }
        console.log(decoded);
        response.status(200).json(results.rows);
      });
    }
  }
);

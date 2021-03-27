import pool from "../../postgres.config";
import { verify } from "jsonwebtoken";

const jwt = require("jsonwebtoken");

export default (request, response) => {
  if (request.method === "POST") {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) {
      console.log("no token");
      response.status(401).json({ message: "Sorry you are not authenticated" });
      response.end();
    }
    pool.query(
      "SELECT * FROM refreshtokens WHERE refresh_token = $1",
      [token],
      (error, results, fields) => {
        if (error) {
          response
            .status(401)
            .json({ message: "Sorry you are not authenticated" });
          response.end();
        } else if (results.rows.length > 0) {
          console.log("token exists");

          verify(
            token,
            process.env.REFRESH_TOKEN_SECRET,
            async function (err, decoded) {
              if (!err && decoded) {
                const user = { email: decoded.email, id: decoded.id };
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
                  "UPDATE refreshtokens SET refresh_token = $1 WHERE user_id = $2;",
                  [refreshtoken_json, user.id],
                  (error, results) => {
                    if (error) {
                      response.status(400);
                      response.end();
                    } else {
                      console.log(accessToken);
                      response.status(200).json({ accessToken, refreshToken });
                      response.end();
                    }
                  }
                );
              } else {
                response
                  .status(401)
                  .json({ message: "Sorry you are not authenticated" });
              }
            }
          );
        } else
          response
            .status(401)
            .json({ message: "Sorry you are not authenticated" });
      }
    );
  }
};

import pool from "../../postgres.config";
import { authenticate } from "../../api-assets/authenticateUser";

export default authenticate(
  process.env.REFRESH_TOKEN_SECRET,
  function (request, response, decoded) {
    console.log(decoded);
    if (request.method === "POST") {
      var id = decoded.id;
      pool.query(
        "DELETE FROM refreshtokens WHERE user_id = $1",
        [id],
        (error, results, fields) => {
          if (error) response.send(400);
          else response.send(200);
          response.end();
        }
      );
    } else {
      response.send(400);
      response.end;
    }
  }
);

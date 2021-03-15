import pool from "../../postgres.config";

export default (req, res) => {
  if (req.method === "GET") {
    pool.query("SELECT * FROM slices ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
  if (req.method === "POST") {
    pool.query(
      "UPDATE TOP (1) slices SET user_id = 3 WHERE user_id IS NULL",
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  }
};

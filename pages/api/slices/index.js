import pool from "../../../postgres.config";

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
      "UPDATE slices SET user_id = 2 WHERE id IN (SELECT id FROM slices WHERE user_id IS NULL  LIMIT 1)",
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send("slice bought");
      }
    );
  }
};

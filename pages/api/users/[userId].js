import pool from "../../../postgres.config";
export default (request, response) => {
  const { userId } = request.query;
  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

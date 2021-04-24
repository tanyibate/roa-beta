// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool from "../../postgres.config";

export default (req, res) => {
  const { id } = req.body;
  pool.query("SELECT email FROM users WHERE id = $1", [id]).then((results) => {
    if (results.rows.length) {
      res.status(200).json({ email: results.rows[0].email });
    } else res.status(200).json({ email: "" });
  });
};

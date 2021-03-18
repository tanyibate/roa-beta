import pool from "../../../postgres.config";
export default (request, response) => {
  const { artistId } = request.query;
  pool.query(
    "SELECT * FROM slices WHERE artist_id = $1",
    [artistId],
    (error, results) => {
      if (error) {
        throw error;
      }
      let numOfRemainingSlices = 0;
      results.rows.forEach((el) => {
        if (!el.user_id) numOfRemainingSlices += 1;
      });

      const info = {
        numOfSlices: results.rows.length,
        numOfRemainingSlices: numOfRemainingSlices,
      };
      response.status(200).json(info);
    }
  );
};

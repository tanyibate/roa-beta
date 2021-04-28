// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
export default (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body;
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      // err
      // decoded undefined
      console.log(decoded);
      console.log(err);
      if (decoded) res.status(200).json({ email: decoded.email });
      else res.status(200).json({ email: null });
    });
  }
};

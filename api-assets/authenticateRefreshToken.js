import { verify } from "jsonwebtoken";

export const authenticate = (secret, fn) => async (req, res, decoded) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    res.status(401).json({ message: "Sorry you are not authenticated" });
    res.end();
  }

  verify(token, secret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res, decoded);
    }

    res.status(401).json({ message: "Sorry you are not authenticated" });
  });
};

import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = user; // Attach user info to request
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error authenticating token", error: error.message });
  }
};

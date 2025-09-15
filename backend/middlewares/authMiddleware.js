import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = {
        id: user.userId, // Map userId from JWT payload to id
        role: user.role
      }; // Attach user info to request
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error authenticating token", error: error.message });
  }
};

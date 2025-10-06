import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  
  if (
    (req.method === "POST" && req.path === "/login") ||
    (req.method === "POST" && req.path === "/postDoctor")
  ) {
    return next();
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const secret = process.env.JWT_SECRET || "you-secret-key";
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

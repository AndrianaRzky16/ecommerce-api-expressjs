import jwt from "jsonwebtoken";
import { getUserById } from "../models/userModels.js";

const JWT_SECRET = "568970";

const jwtMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default jwtMiddleware;

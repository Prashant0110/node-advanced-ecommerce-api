import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
    const security = process.env.JWT_SECRET;
    if (!security) {
      return res.status(401).json({
        message: "invalid token",
        success: false,
      });
    }
    const decodedPayload = jwt.verify(token, security);

    req.user = decodedPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
      success: false,
    });
  }
}

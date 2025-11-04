import { Request, Response, NextFunction } from "express";
import { AuthenticationSchema } from "../validators/input.validator";
export async function userAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dataValidation = AuthenticationSchema.parse(req.body);
    req.validatedBody = dataValidation;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid request body",
      success: false,
      error: (error as Error).message,
    });
  }
}

import { Request, Response } from "express";
import { registerUser } from "../services/registerAuth.service";

export async function registerController(req: Request, res: Response) {
  try {
    const { email, password } = req.validatedBody!;
    await registerUser(email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please log in.",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

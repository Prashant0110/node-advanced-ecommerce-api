import { Request, Response } from "express";
import { loginUser } from "../services/loginAuth.service";

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.validatedBody!;
    const token = await loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "strict",
    });

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

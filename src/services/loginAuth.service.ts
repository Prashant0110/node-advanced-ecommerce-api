import { findyUserByEmail } from "../repo/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function loginUser(email: string, password: string) {
  // Check if user exists
  let user = await findyUserByEmail(email);

  if (!user || (await !bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT secret");

  const payload = { userId: user.id };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
}

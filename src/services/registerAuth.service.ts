import { createUser, findyUserByEmail } from "../repo/auth";
import bcrypt from "bcrypt";

export async function registerUser(email: string, password: string) {
  // Check if user exists
  let existingUser = await findyUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password

  // Create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(email, hashedPassword);

  return user;
}

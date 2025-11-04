import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//create user registration

export async function createUser(email: string, hashedPassword: string) {
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  return user;
}

export async function findyUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

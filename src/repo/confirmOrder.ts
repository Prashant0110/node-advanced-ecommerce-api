import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function confirmOrder(id: number) {
  const order = await prisma.orders.update({
    where: { id },
    data: { status: OrderStatus.COMPLETED },
  });
  return order;
}

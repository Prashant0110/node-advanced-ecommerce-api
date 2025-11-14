import { Prisma } from "@prisma/client";

export async function createOrder(
  orderInput: Prisma.OrdersCreateInput,
  tx: Prisma.TransactionClient
) {
  const order = await tx.orders.create({
    data: orderInput,
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return order;
}

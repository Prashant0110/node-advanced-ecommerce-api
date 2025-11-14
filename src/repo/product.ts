import { Prisma } from "@prisma/client";

export async function getAllproductDetails(
  ids: number[],
  tx: Prisma.TransactionClient
) {
  const products = await tx.product.findMany({
    where: {
      id: { in: ids },
    },
    select: { id: true, price: true, name: true },
  });
  return products;
}

export async function getSingleProductDetails(
  id: number,
  tx: Prisma.TransactionClient
) {
  const product = await tx.product.findUnique({
    where: {
      id: id,
    },
    select: { id: true, price: true, name: true },
  });
  return product;
}

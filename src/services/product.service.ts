import { Prisma } from "@prisma/client";
import { getSingleProductDetails, getAllproductDetails } from "../repo/product";

export async function ProductService(
  id: number[],
  tx: Prisma.TransactionClient
) {
  const products = await getAllproductDetails(id, tx);
  if (products.length === 0) {
    throw new Error("Product not found");
  }

  return { products };
}

export async function SingleProductService(
  id: number,
  tx: Prisma.TransactionClient
) {
  const product = await getSingleProductDetails(id, tx);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

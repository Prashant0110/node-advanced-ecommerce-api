import { z } from "zod";

export const OrderSchema = z.object({
  userId: z.number(),
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
    })
  ),
});

export const AuthenticationSchema = z.object({
  email: z
    .string()
    .transform((s) => s.trim())
    .refine((s) => z.email().safeParse(s).success, {
      message: "Invalid email address",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type AuthenticationData = z.infer<typeof AuthenticationSchema>;

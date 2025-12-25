import { z } from "zod";

const createProductValidationSchema = z.object({
  title: z.string().min(1).max(150),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).optional(),
  is_trending: z.boolean().optional(),
  brand_id: z.number().int(),
});

const updateProductValidationSchema = z.object({
  title: z.string().min(1).max(150).optional(),
  price: z.number().positive().optional(),
  quantity: z.number().int().nonnegative().optional(),
  rating: z.number().min(0).max(5).optional(),
  is_trending: z.boolean().optional(),
  brand_id: z.number().int().optional(),
});

export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};

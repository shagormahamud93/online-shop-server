import { z } from "zod";

const createBrandValidationSchema = z.object({
  name: z.string().min(1).max(100),
});

const updateBrandValidationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
});

export const brandValidation = {
  createBrandValidationSchema,
  updateBrandValidationSchema,
};

import { z } from "zod";

const createCategoryValidationSchema = z.object({
  name: z.string().min(1).max(100),
  parent_id: z.number().int().nullable().optional(),
});

const updateCategoryValidationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  parent_id: z.number().int().nullable().optional(),
});

export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};

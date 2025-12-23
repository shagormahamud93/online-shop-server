import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(255),
  role: z.enum(["customer", "admin"]).optional(),
});

export const UpdateuserValidationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(255).optional(),
  role: z.enum(["customer", "admin"]).optional(),
});

export const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().max(255),
});

export const getUserValidationSchema = z.object({
  token: z.string(),
});

export const UserValidation = {
  userValidationSchema,
  loginValidationSchema,
  UpdateuserValidationSchema,
  getUserValidationSchema,
};

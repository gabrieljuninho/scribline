import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(6, { message: "Username must be at least 6 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" })
    .regex(/^\S+$/, { message: "Username must not contain spaces" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(64, { message: "Email must be at most 64 characters long" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

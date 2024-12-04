/* eslint-disable indent */
"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/auth";

import { getUserByEmail } from "@/features/auth/helpers/user";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { LoginSchema } from "@/schemas/auth";

import { sanitizeValues } from "@/lib/sanitize";

export const login = async (
  value: z.infer<typeof LoginSchema>,
  callBackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  const sanitizedData = sanitizeValues({ email, password });

  const existingUser = await getUserByEmail(sanitizedData.email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: "Invalid credentials",
    };
  }

  if (existingUser.password) {
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return {
        error: "Invalid credentials",
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return {
      success: "Logged in successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          return {
            error: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

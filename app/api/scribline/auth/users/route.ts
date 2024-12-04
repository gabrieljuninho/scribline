import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { User } from "@prisma/client";

import { CloudinaryError as UploadServicesError } from "@/common/utils/cloudinary";

import { generateImage } from "@/features/auth/helpers/image";
import {
  getUserByEmail,
  getUserByUsername,
} from "@/features/auth/helpers/user";

import { Cloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { sanitizeValues } from "@/lib/sanitize";

import { RegisterSchema } from "@/schemas/auth";

export const POST = async (req: NextRequest) => {
  try {
    const values = await req.json();

    const cloudinary = new Cloudinary();

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return NextResponse.json({ status: 400, message: "Invalid request" });
    }

    const { username, email, password } = validatedFields.data;

    const sanitizedData = sanitizeValues({ username, email, password });

    const existingUserByUsername = await getUserByUsername(
      sanitizedData.username as string
    );

    if (existingUserByUsername) {
      return NextResponse.json({
        status: 400,
        message: "Account with this username already exists.",
      });
    }

    const existingUserByEmail = await getUserByEmail(sanitizedData.email);

    if (existingUserByEmail) {
      return NextResponse.json({
        status: 400,
        message: "Account with this email address already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(sanitizedData.password, 10);

    const imageUrl = generateImage(sanitizedData.username as string);

    const rootFolder = await cloudinary.createRootFolder(
      sanitizedData.username as string
    );

    const user: User = await db.user.create({
      data: {
        username: sanitizedData.username,
        email: sanitizedData.email,
        password: hashedPassword,
        image: imageUrl,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "User created successfully.",
      user,
      rootFolder,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    } else if (error instanceof UploadServicesError) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: "Internal server error. Please try again later.",
      });
    }
  }
};

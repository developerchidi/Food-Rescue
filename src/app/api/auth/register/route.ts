import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { RegisterSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = RegisterSchema.parse(body);

    // Kiểm tra email tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email này đã được sử dụng" },
        { status: 400 }
      );
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Đăng ký thành công", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("Lỗi đăng ký:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra trong quá trình đăng ký" },
      { status: 500 }
    );
  }
}

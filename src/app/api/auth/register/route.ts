import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      )
    }

    // Kiểm tra email tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Email này đã được sử dụng" },
        { status: 400 }
      )
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10)

    // Tạo người dùng
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: "Đăng ký thành công", userId: user.id },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Lỗi đăng ký:", error)
    return NextResponse.json(
      { message: "Có lỗi xảy ra trong quá trình đăng ký" },
      { status: 500 }
    )
  }
}

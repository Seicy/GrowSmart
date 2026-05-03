import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // validasi sederhana
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      )
    }

    // cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      )
    }

    // simpan user baru
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password // nanti bisa kita hash (bcrypt)
      }
    })

    return NextResponse.json(
      { message: "Register berhasil!", user: newUser },
      { status: 201 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: "Gagal register" },
      { status: 500 }
    )
  }
}
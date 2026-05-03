import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET
export async function GET() {
  try {
    const data = await prisma.sensorData.findMany({
      include: { plant: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 })
  }
}

// POST
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const data = await prisma.sensorData.create({
      data: {
        temperature: body.temperature,
        humidity: body.humidity,
        soilMoisture: body.soilMoisture,
        plantId: body.plantId || 1
      }
    })

    return NextResponse.json({ message: "Data masuk!", data })
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 400 })
  }
}
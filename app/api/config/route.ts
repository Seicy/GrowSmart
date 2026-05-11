import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET — load config
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  let config = await prisma.config.findFirst();

  if (!config) {
    config = await prisma.config.create({
      data: { soilThreshold: 30, manualWatering: false },
    });
  }

  return NextResponse.json({ success: true, config });
}

// POST — save config
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { soilThreshold, manualWatering } = await req.json();

  let config = await prisma.config.findFirst();

  if (!config) {
    config = await prisma.config.create({
      data: { soilThreshold, manualWatering },
    });
  } else {
    config = await prisma.config.update({
      where: { id: config.id },
      data: { soilThreshold, manualWatering },
    });
  }

  return NextResponse.json({ success: true, config });
}
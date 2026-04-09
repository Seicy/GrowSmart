import { NextResponse } from 'next/server';

// Data ini disimpan di memori sementara (akan reset jika server mati)
// Nantinya ini bisa kamu hubungkan ke Database seperti Supabase/PostgreSQL
let sensorData = {
  moisture: 0,
  pestDetected: false,
  lastUpdate: new Date().toISOString()
};

// Fungsi untuk Dashboard mengambil data (GET)
export async function GET() {
  return NextResponse.json(sensorData);
}

// Fungsi untuk ESP32 mengirim data (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    sensorData = {
      moisture: body.moisture,
      pestDetected: body.pestDetected,
      lastUpdate: new Date().toISOString()
    };

    return NextResponse.json({ message: "Data terupdate!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal membaca data" }, { status: 400 });
  }
}
/* --- 3. CONFIGURATION TAB --- */
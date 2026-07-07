import { NextResponse } from 'next/server';

export async function GET() {
  const uri = process.env.MONGODB_URI || '';
  const maskedUri = uri.replace(/:[^:@]+@/, ':***@');
  return NextResponse.json({ uri: maskedUri, length: uri.length });
}

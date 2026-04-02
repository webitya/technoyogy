import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  if (!token) return false;
  try {
    verify(token.value, process.env.JWT_SECRET || 'secret');
    return true;
  } catch {
    return false;
  }
}

export async function GET(request) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  try {
    const client = await clientPromise;
    const db = client.db('technoyogy');
    const enquiries = await db.collection('enquiries').find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray();
    const total = await db.collection('enquiries').countDocuments();
    return NextResponse.json({
      enquiries: JSON.parse(JSON.stringify(enquiries)),
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

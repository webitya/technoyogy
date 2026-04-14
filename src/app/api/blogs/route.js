import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 3;
    const client = await clientPromise;
    const db = client.db("technoyogy");
    const blogs = await db.collection("blogs").find({ status: { $ne: 'draft' } }).sort({ createdAt: -1 }).limit(limit).toArray();
    return NextResponse.json(JSON.parse(JSON.stringify(blogs)));
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching blogs' }, { status: 500 });
  }
}

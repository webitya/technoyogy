import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db('technoyogy');

    await db.collection('blogs').updateOne(
      { slug },
      { $inc: { views: 1 } }
    );

    return NextResponse.json({ message: 'View incremented' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating views' }, { status: 500 });
  }
}

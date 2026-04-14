import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('technoyogy');
    const stats = await db.collection('stats').findOne({ _id: 'visitors' });
    return NextResponse.json({ count: stats?.count || 0 });
  } catch (error) {
    return NextResponse.json({ count: 0 });
  }
}

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db('technoyogy');
    
    // In mongodb v6+, findOneAndUpdate returns the document directly
    const doc = await db.collection('stats').findOneAndUpdate(
      { _id: 'visitors' },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    
    return NextResponse.json({ count: doc?.count || 1 });
  } catch (error) {
    console.error('Visitor counter error:', error);
    return NextResponse.json({ count: 0 });
  }
}


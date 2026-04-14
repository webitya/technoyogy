import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { action } = body; // 'like', 'unlike', 'share'

    if (!['like', 'share', 'unlike'].includes(action)) {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('technoyogy');

    let update = {};
    if (action === 'like') {
      update = { $inc: { likes: 1 } };
    } else if (action === 'unlike') {
      update = { $inc: { likes: -1 } };
    } else if (action === 'share') {
      update = { $inc: { shares: 1 } };
    }

    const result = await db.collection('blogs').findOneAndUpdate(
      { slug },
      update,
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      likes: result.likes || 0,
      shares: result.shares || 0
    }, { status: 200 });

  } catch (error) {
    console.error('Action error', error);
    return NextResponse.json({ message: 'Error updating' }, { status: 500 });
  }
}

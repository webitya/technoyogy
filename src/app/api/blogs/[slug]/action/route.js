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

    console.log(`Action: ${action} for slug: ${slug}`);
    const result = await db.collection('blogs').findOneAndUpdate(
      { slug },
      update,
      { returnDocument: 'after' }
    );

    if (!result) {
      console.log('Blog not found');
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // In some driver versions findOneAndUpdate returns an object with a 'value' property
    const doc = result.value || result;
    console.log(`Updated doc: ${doc.title}, Likes: ${doc.likes}, Shares: ${doc.shares}`);

    return NextResponse.json({ 
      likes: Number(doc.likes || 0),
      shares: Number(doc.shares || 0)
    }, { status: 200 });

  } catch (error) {
    console.error('Action error', error);
    return NextResponse.json({ message: 'Error updating' }, { status: 500 });
  }
}

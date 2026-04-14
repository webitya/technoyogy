import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db('technoyogy');

    const blog = await db.collection('blogs').findOne(
      { slug },
      { projection: { likes: 1, shares: 1 } }
    );

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      likes: Number(blog.likes || 0),
      shares: Number(blog.shares || 0)
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching stats' }, { status: 500 });
  }
}

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

    const doc = await db.collection('blogs').findOneAndUpdate(
      { slug },
      update,
      { returnDocument: 'after' }
    );

    if (!doc) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      likes: Number(doc.likes || 0),
      shares: Number(doc.shares || 0)
    }, { status: 200 });

  } catch (error) {
    console.error('Action error', error);
    return NextResponse.json({ message: 'Error updating' }, { status: 500 });
  }
}


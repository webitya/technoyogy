import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    try { verify(token.value, process.env.JWT_SECRET || 'secret'); } catch { return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); }

    const client = await clientPromise;
    const db = client.db('technoyogy');

    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    try { verify(token.value, process.env.JWT_SECRET || 'secret'); } catch { return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); }

    const { title, description, images, buyLink } = await request.json();

    const client = await clientPromise;
    const db = client.db('technoyogy');

    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, images, buyLink, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Product updated' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}


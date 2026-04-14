import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

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

export async function DELETE(request, { params }) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('technoyogy');
    await db.collection('enquiries').deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ message: 'Enquiry deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status } = await request.json();
    const client = await clientPromise;
    const db = client.db('technoyogy');
    await db.collection('enquiries').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { status } }
    );
    return NextResponse.json({ message: 'Status updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

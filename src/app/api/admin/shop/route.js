import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('technoyogy');
    const products = await db.collection('products').find({}).sort({ createdAt: -1 }).toArray();
    console.log(`Fetched ${products.length} products from DB`);
    return NextResponse.json(JSON.parse(JSON.stringify(products)));
  } catch (error) {
    console.error('SHOP_GET_ERROR:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    try { verify(token.value, process.env.JWT_SECRET || 'secret'); } catch { return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); }

    const { title, description, images, buyLink } = await request.json();

    if (!title || !description || !images || !buyLink) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('technoyogy');

    const product = {
      title,
      description,
      images, // Expecting an array of strings
      buyLink,
      createdAt: new Date(),
    };

    const result = await db.collection('products').insertOne(product);

    return NextResponse.json({ message: 'Product added', id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

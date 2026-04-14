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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('technoyogy');
    const categories = await db.collection('categories').find({}).toArray();
    
    // Default categories if none exist
    if (categories.length === 0) {
      const defaults = ['TECH', 'LIFESTYLE', 'FUTURE', 'NEWS', 'AI', 'GADGETS', 'REVIEW'];
      await db.collection('categories').insertMany(defaults.map(name => ({ name, createdAt: new Date() })));
      const updated = await db.collection('categories').find({}).toArray();
      return NextResponse.json(updated);
    }

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name } = await request.json();
    if (!name) return NextResponse.json({ message: 'Name is required' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('technoyogy');
    
    const uppercaseName = name.trim().toUpperCase();
    const existing = await db.collection('categories').findOne({ name: uppercaseName });
    
    if (existing) {
      return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
    }

    const result = await db.collection('categories').insertOne({
      name: uppercaseName,
      createdAt: new Date()
    });

    return NextResponse.json({ message: 'Category created', id: result.insertedId, name: uppercaseName }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating category' }, { status: 500 });
  }
}

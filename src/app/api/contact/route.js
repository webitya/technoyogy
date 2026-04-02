import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Required fields missing' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('technoyogy');

    const enquiry = {
      name,
      email,
      subject: subject || 'General Enquiry',
      message,
      createdAt: new Date(),
      status: 'NEW'
    };

    await db.collection('enquiries').insertOne(enquiry);

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

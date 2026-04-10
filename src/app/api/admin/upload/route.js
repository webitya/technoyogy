import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    try { verify(token.value, process.env.JWT_SECRET || 'secret'); } catch { return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'technoyogy' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}

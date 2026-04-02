import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      verify(token.value, process.env.JWT_SECRET || 'secret');
    } catch (e) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title');
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const category = formData.get('category');
    const imageFile = formData.get('image');

    let imageUrl = '';
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const client = await clientPromise;
    const db = client.db("technoyogy");

    // Check if slug exists and handle collisions
    let finalSlug = slug;
    const existing = await db.collection("blogs").findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }
    
    const tags = formData.get('tags') || '';
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    const newBlog = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      content,
      category,
      tags: tagsArray,
      image: imageUrl,
      views: 0, // Initialize views
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("blogs").insertOne(newBlog);

    return NextResponse.json({ 
      message: 'Blog created successfully',
      id: result.insertedId 
    }, { status: 201 });
  } catch (error) {
    console.error('BLOG_SAVE_ERROR:', error);
    return NextResponse.json({ message: error.message || 'An error occurred during save' }, { status: 500 });
  }
}

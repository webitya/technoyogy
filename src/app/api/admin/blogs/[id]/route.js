import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
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

// GET single blog
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("technoyogy");
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });
    if (!blog) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(JSON.parse(JSON.stringify(blog)));
  } catch (error) {
    console.error('BLOG_FETCH_ERROR:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// PUT update blog
export async function PUT(request, { params }) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get('title');
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const category = formData.get('category');
    const imageFile = formData.get('image');
    const tags = formData.get('tags') || '';
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    const updateData = { 
      title: title.trim(), 
      excerpt: excerpt.trim(), 
      content, 
      category, 
      tags: tagsArray, 
      updatedAt: new Date() 
    };

    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(buffer);
      });
      updateData.image = uploadResponse.secure_url;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    
    const client = await clientPromise;
    const db = client.db("technoyogy");

    // Check if slug changed and if it collisions
    const currentBlog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });
    if (!currentBlog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });

    if (slug !== currentBlog.slug) {
      let finalSlug = slug;
      const existing = await db.collection("blogs").findOne({ slug: finalSlug, _id: { $ne: new ObjectId(id) } });
      if (existing) {
        finalSlug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
      }
      updateData.slug = finalSlug;
    }

    await db.collection("blogs").updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({ message: 'Blog updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('BLOG_UPDATE_ERROR:', error);
    return NextResponse.json({ message: error.message || 'An error occurred during update' }, { status: 500 });
  }
}

// DELETE blog
export async function DELETE(request, { params }) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("technoyogy");
    await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('BLOG_DELETE_ERROR:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

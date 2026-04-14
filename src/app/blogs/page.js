import clientPromise from '@/lib/mongodb';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogListClient from '@/components/BlogListClient';

async function getAllBlogs() {
  try {
    const client = await clientPromise;
    const db = client.db("technoyogy");
    // Only fetch published blogs
    const blogs = await db.collection("blogs").find({ status: { $ne: 'draft' } }).sort({ createdAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(blogs));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function AllBlogs() {
  const blogs = await getAllBlogs();
  const categories = ['ALL', ...new Set(blogs.flatMap(b => b.categories || (b.category ? [b.category] : ['TECH'])))];

  return (
    <main className="min-h-screen bg-gray-50/30">
      <Navbar />
      
      <BlogListClient initialBlogs={blogs} categories={categories} />

      <Footer />
    </main>
  );
}

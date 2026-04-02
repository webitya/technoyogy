import clientPromise from '@/lib/mongodb';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

async function getAllBlogs() {
  try {
    const client = await clientPromise;
    const db = client.db("technoyogy");
    const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(blogs));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function AllBlogs() {
  const blogs = await getAllBlogs();
  const categories = ['ALL', ...new Set(blogs.map(b => b.category || 'TECH'))];

  return (
    <main className="min-h-screen bg-gray-50/30">
      <Navbar />
      
      {/* Simplified Header */}
      <section className="pt-32 pb-8 relative overflow-hidden bg-white">
         <div className="absolute top-0 right-0 w-[40%] h-full bg-[#fb2576]/[0.01] -z-10 rounded-bl-[150px] border-l border-gray-50 overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-[0.03] rotate-12 scale-150" style={{ backgroundImage: 'radial-gradient(#fb2576 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
         </div>
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-start gap-4">
            {/* Category Filter Bar - Kept for UX */}
            <div className="flex flex-wrap gap-2 w-full">
               {categories.map(cat => (
                  <button key={cat} className={`px-5 py-2.5 text-[9px] font-black uppercase tracking-widest border transition-all ${cat === 'ALL' ? 'bg-[#fb2576] text-white border-[#fb2576]' : 'bg-white text-gray-400 border-gray-100 hover:border-primary hover:text-primary rounded-[2px]'}`}>
                    {cat}
                  </button>
               ))}
            </div>
         </div>
      </section>

      {/* Grid Registry - Compact & Industrial */}
      <section className="pb-32 px-6 max-w-7xl mx-auto mt-12">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link href={`/blog/${blog.slug}`} key={blog._id} className="group flex flex-col gap-6 p-4 rounded-[3px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                    <img
                      src={blog.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                      alt={blog.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-[#fb2576] text-white rounded-[2px] text-[10px] font-black tracking-widest uppercase shadow-lg shadow-[#fb2576]/30">
                      {blog.category || "TECH"}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-4">
                    <h3 className="text-xl font-black leading-tight group-hover:text-[#fb2576] transition-colors line-clamp-2 uppercase tracking-tight italic">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 line-clamp-3 text-base leading-relaxed font-medium">
                      {blog.excerpt || "Exploring future tech, tactical productivity, and lifestyle engineering."}
                    </p>
                    <div className="flex items-center pt-4 border-t border-gray-50 text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
                       <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-32 text-center bg-white border border-gray-100 rounded-[3px] shadow-sm">
              <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[4px] mb-8 italic">SYNCHRONIZING TACTICAL INSIGHTS...</h4>
              <Link href="/" className="admin-btn-primary py-4 px-12 text-[11px] rounded-[3px] shadow-xl shadow-primary/20">FORCE RETURN HOME</Link>
            </div>
          )}
      </section>

      <Footer />
    </main>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import BlogActions from './BlogActions';

export default function BlogListClient({ initialBlogs, categories }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredBlogs = activeCategory === 'ALL' 
    ? initialBlogs 
    : initialBlogs.filter(b => {
        const cats = b.categories || (b.category ? [b.category] : ['TECH']);
        return cats.includes(activeCategory);
      });

  return (
    <>
      <section className="pt-32 pb-8 relative overflow-hidden bg-white">
         <div className="absolute top-0 right-0 w-[40%] h-full bg-[#7a3983]/[0.01] -z-10 rounded-bl-[150px] border-l border-gray-50 overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-[0.03] rotate-12 scale-150" style={{ backgroundImage: 'radial-gradient(#7a3983 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
         </div>
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-start gap-4">
            <div className="flex flex-wrap gap-2 w-full">
               {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 text-[9px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-[#7a3983] text-white border-[#7a3983]' : 'bg-white text-gray-400 border-gray-100 hover:border-[#7a3983] hover:text-[#7a3983] rounded-[2px]'}`}
                  >
                    {cat}
                  </button>
               ))}
            </div>
         </div>
      </section>

      <section className="pb-32 px-6 max-w-7xl mx-auto mt-12">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <div key={blog._id} className="group flex flex-col p-4 rounded-[3px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <Link href={`/blog/${blog.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-[2px] block shrink-0">
                    <img
                      src={blog.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                      alt={blog.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-[#7a3983] text-white rounded-[2px] text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-[#7a3983]/30">
                      {(blog.categories?.[0]) || blog.category || "TECH"}
                    </div>
                  </Link>
                  <div className="flex flex-col gap-3 p-4 flex-1">
                    <Link href={`/blog/${blog.slug}`} className="block">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-[#7a3983] transition-colors line-clamp-2 uppercase tracking-tight mb-3">
                        {blog.title}
                      </h3>
                      <p className="text-gray-500 line-clamp-3 text-base leading-relaxed font-medium">
                        {blog.excerpt || "Exploring future tech, tactical productivity, and lifestyle engineering."}
                      </p>
                    </Link>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto text-[10px] text-gray-300">
                       <span className="font-bold uppercase tracking-widest">{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
                       <BlogActions slug={blog.slug} initialLikes={blog.likes} initialShares={blog.shares} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-32 text-center bg-white border border-gray-100 rounded-[3px] shadow-sm">
              <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[4px] mb-8 italic">SYNCHRONIZING TACTICAL INSIGHTS...</h4>
              <button onClick={() => setActiveCategory('ALL')} className="admin-btn-primary py-4 px-12 text-[11px] rounded-[3px] shadow-xl shadow-primary/20">CLEAR FILTER</button>
            </div>
          )}
      </section>
    </>
  );
}

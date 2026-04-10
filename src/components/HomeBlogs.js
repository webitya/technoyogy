'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SkeletonCard = () => (
  <div className="flex flex-col gap-6 p-4 rounded-[40px] bg-white border border-gray-100 shadow-sm animate-pulse">
    <div className="aspect-[4/3] rounded-[30px] bg-gray-100" />
    <div className="flex flex-col gap-3 p-4">
      <div className="h-6 w-3/4 bg-gray-100 rounded-lg" />
      <div className="h-4 w-full bg-gray-50 rounded-lg" />
      <div className="h-4 w-5/6 bg-gray-50 rounded-lg" />
      <div className="pt-4 border-t border-gray-50 flex gap-4">
        <div className="h-3 w-20 bg-gray-50 rounded-lg" />
        <div className="h-3 w-16 bg-gray-50 rounded-lg" />
      </div>
    </div>
  </div>
);

export default function HomeBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs?limit=3')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center w-full col-span-3">
        <p className="font-black text-gray-300 uppercase tracking-widest text-xs">Waiting for tactical insights...</p>
        <p className="text-gray-200 text-[10px] mt-2 italic font-black uppercase tracking-tighter">DATABASE STATUS: RECORD LOGS EMPTY</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {Array.isArray(blogs) && blogs.map((blog) => (
        <Link 
          href={`/blog/${blog.slug}`} 
          key={blog._id} 
          className="group flex flex-col gap-6 p-4 rounded-[3px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
            <img
              src={blog.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
              alt={blog.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-[#7a3983] text-white rounded-[2px] text-xs font-black tracking-widest uppercase shadow-lg shadow-[#7a3983]/30">
              {blog.category || "TECH"}
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <h3 className="text-xl font-black leading-tight group-hover:text-[#7a3983] transition-colors line-clamp-2 uppercase tracking-tight italic">
              {blog.title}
            </h3>
            <p className="text-gray-500 line-clamp-3 text-base leading-relaxed font-medium">
              {blog.excerpt}
            </p>
            <div className="flex items-center pt-4 border-t border-gray-50 text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

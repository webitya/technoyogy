import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

async function getAdminBlogs(page = 1, limit = 10) {
  try {
    const client = await clientPromise;
    const db = client.db('technoyogy');
    const skip = (page - 1) * limit;
    const blogs = await db.collection('blogs').find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray();
    const total = await db.collection('blogs').countDocuments();
    return { 
      blogs: JSON.parse(JSON.stringify(blogs)),
      total,
      pages: Math.ceil(total / limit)
    };
  } catch {
    return { blogs: [], total: 0, pages: 0 };
  }
}

export default async function AdminDashboard({ searchParams }) {
  const currentParams = await searchParams;
  const page = parseInt(currentParams.page) || 1;
  const limit = 10;
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  if (!token) redirect('/admin');
  try { verify(token.value, process.env.JWT_SECRET || 'secret'); } catch { redirect('/admin'); }

  const { blogs, total, pages } = await getAdminBlogs(page, limit);
  const totalBlogs = total;
  const categories = [...new Set(blogs.map(b => b.category || 'TECH'))];
  const latest = blogs[0];

  return (
    <div className="p-8 min-h-screen bg-[#fcfcfc]">

      {/* Header - Compact & Sharp */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-widest uppercase">DASHBOARD</h1>
        <Link href="/admin/dashboard/new" className="admin-btn-primary py-2.5 px-6">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          COMPOSE NEW
        </Link>
      </div>

      {/* Stats Grid - Sharp & Industrial */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="stat-icon bg-gray-50 text-[#7a3983] border border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#1a1a1a] tracking-tighter">{totalBlogs}</p>
            <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">PUBLISHED</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gray-50 text-indigo-500 border border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-[#1a1a1a] tracking-tighter">{categories.length}</p>
            <p className="text-[9px] font-black tracking-widest text-gray-400 uppercase">CATEGORIES</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-[#7a3983]/[0.04] text-[#7a3983] border border-[#7a3983]/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-[#7a3983] tracking-tighter">ONLINE</p>
            <p className="text-[9px] font-black tracking-widest text-gray-400 uppercase">PLATFORM STATUS</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gray-50 text-rose-500 border border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-black text-[#1a1a1a] truncate tracking-tight">{latest ? new Date(latest.createdAt).toLocaleDateString() : 'NO ENTRIES'}</p>
            <p className="text-[9px] font-black tracking-widest text-gray-400 uppercase">LAST MODIFIED</p>
          </div>
        </div>
      </div>

      {/* Listing - Sharp & Modular */}
      <div className="admin-card !p-0 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-[#7a3983]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h2 className="font-black text-[#1a1a1a] text-xs uppercase tracking-widest">JOURNAL REGISTRY</h2>
          </div>
          <div className="flex items-center gap-1">
            {categories.map(cat => (
              <span key={cat} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-[2px] bg-gray-50 border border-gray-100 text-gray-400">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm admin-table">
            <thead>
              <tr>
                <th className="text-left w-[420px]">TITLE & URI IDENTIFIER</th>
                <th className="text-left">DOMAIN</th>
                <th className="text-left">VIEWS</th>
                <th className="text-left hidden md:table-cell">TIMESTAMP</th>
                <th className="text-right">OPS</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? blogs.map((blog) => (
                <tr key={blog._id} className="group transition-colors border-b border-gray-50 last:border-0 hover:bg-gray-50/30">
                  <td className="!pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-[2px] overflow-hidden border border-gray-100 flex-shrink-0 bg-white">
                        <img
                          src={blog.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&q=60'}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-[#1a1a1a] truncate max-w-[320px] text-[11px] uppercase tracking-tight">{blog.title}</p>
                        <p className="text-[9px] font-bold text-gray-400 truncate max-w-[320px] mt-0.5 tracking-tighter uppercase">ID: {blog.slug || blog._id.slice(-8)}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[2px] border border-[#7a3983]/10 bg-[#7a3983]/[0.03] text-[#7a3983]">
                      {blog.category || 'TECH'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-[10px] font-black text-gray-700 tracking-tighter">{(blog.views || 0).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                  </td>
                  <td className="!pr-6">
                    <div className="flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100">
                      <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-[2px] transition-all border border-gray-100 bg-white hover:border-[#7a3983] hover:text-[#7a3983]" title="PREVIEW">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </a>
                      <Link href={`/admin/dashboard/edit/${blog._id}`}
                        className="p-2 rounded-[2px] transition-all border border-gray-100 bg-white hover:border-[#7a3983] hover:text-[#7a3983]" title="EDIT">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/>
                        </svg>
                      </Link>
                      <DeleteButton id={blog._id} />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-[2px] bg-gray-50 flex items-center justify-center text-gray-200 border border-gray-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                        </svg>
                      </div>
                      <p className="font-black text-gray-300 uppercase tracking-widest text-[10px]">DATABASE IS CURRENTLY EMPTY</p>
                      <Link href="/admin/dashboard/new" className="admin-btn-primary text-[10px] mt-2 px-8">CREATE NEW RECORD</Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer - Sharp & Compact */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              RECORD LOG: {(page - 1) * limit + 1} TO {Math.min(page * limit, total)} OF {total}
            </p>
            <div className="flex items-center gap-1">
              <Link href={`/admin/dashboard?page=${page - 1}`}
                className={`p-2 border border-gray-100 transition-all rounded-[3px] ${page <= 1 ? 'opacity-20 pointer-events-none' : 'hover:border-primary hover:text-primary text-gray-400'}`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
              </Link>
              <div className="flex items-center gap-0.5">
                {[...Array(pages)].map((_, i) => (
                  <Link key={i} href={`/admin/dashboard?page=${i + 1}`}
                    className={`min-w-[28px] h-7 flex items-center justify-center text-[10px] font-black border transition-all rounded-[3px] ${page === i + 1 ? 'bg-primary text-white border-primary shadow-sm' : 'border-gray-100 text-gray-400 hover:text-primary hover:bg-primary/[0.03]'}`}>
                    {(i + 1).toString().padStart(2, '0')}
                  </Link>
                ))}
              </div>
              <Link href={`/admin/dashboard?page=${page + 1}`}
                className={`p-2 border border-gray-100 transition-all rounded-[3px] ${page >= pages ? 'opacity-20 pointer-events-none' : 'hover:border-primary hover:text-primary text-gray-400'}`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

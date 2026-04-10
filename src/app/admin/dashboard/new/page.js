'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const RichEditor = dynamic(() => import('@/components/admin/RichEditor'), { ssr: false });

const CATEGORIES = ['TECH', 'LIFESTYLE', 'FUTURE', 'NEWS', 'AI', 'GADGETS', 'REVIEW'];

export default function NewBlog() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('TECH');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const router = useRouter();
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || content === '<p></p>') { setError('Content cannot be empty'); return; }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('excerpt', excerpt);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('tags', tags);
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch('/api/admin/blogs', { method: 'POST', body: formData });
      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to create blog');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <form onSubmit={handleSubmit}>
        {/* Top bar - Compact & Sharp */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white/95">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 border border-gray-200 text-gray-400 hover:text-primary transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/>
              </svg>
            </Link>
            <div>
              <h1 className="text-[14px] font-black text-[#1a1a1a] uppercase tracking-widest leading-none italic">NEW RECORD</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-[9px] font-black px-3 py-1.5 border border-primary text-primary tracking-widest uppercase">{error}</span>}
            <button type="button" onClick={() => router.back()} className="admin-btn-secondary text-[10px]">CANCEL</button>
            <button type="submit" disabled={loading} className="admin-btn-primary text-[10px] !shadow-none">
              {loading ? (
                <><span className="w-3 h-3 border-2 border-white/20 border-t-white animate-spin" /> EXECUTING...</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> SAVE & PUBLISH</>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-0 min-h-[calc(100vh-65px)]">
          {/* Main Area */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Tabs - No Rounded corners */}
            <div className="flex gap-0 mb-8 w-fit border border-gray-100">
              {['content', 'seo'].map(tab => (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab ? 'bg-[#7a3983] text-white' : 'text-gray-400 hover:text-[#7a3983]'}`}>
                  {tab === 'content' ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  )}
                  {tab === 'content' ? 'DRAFTING' : 'VISIBILITY'}
                </button>
              ))}
            </div>

            {activeTab === 'content' && (
              <div className="flex flex-col gap-8">
                {/* Title */}
                <div className="flex flex-col gap-3">
                  <input
                    className="admin-input !text-lg !font-black !py-4 placeholder:text-gray-200"
                    placeholder="e.g. The Future of Quantum Computing..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <textarea
                    className="admin-input !text-base !font-bold resize-none border-gray-100 placeholder:text-gray-200"
                    rows={2}
                    placeholder="Provide a concise hook summary for the blog preview..."
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <RichEditor value={content} onChange={setContent} />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="flex flex-col gap-8 max-w-3xl">
                <div className="admin-card !p-8">
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-6">SERP SIMULATION UNIT</h3>
                  <div className="p-6 rounded-[2px] bg-gray-50 border border-gray-100 border-l-4 border-l-[#7a3983]">
                    <p className="text-[9px] font-black text-[#7a3983] tracking-widest uppercase mb-1">Technoyogyai.com › analytics › blog</p>
                    <p className="text-xl font-black text-[#1a1a1a] mb-2 leading-tight uppercase tracking-tight">{title || 'PRIMARY HEADLINE ENTRY'}</p>
                    <p className="text-[12px] font-medium text-gray-500 leading-relaxed line-clamp-2 uppercase tracking-tighter">{excerpt || 'META DESCRIPTION DATA SOURCE FOR PUBLIC INDEXING.'}</p>
                  </div>
                </div>
                <div className="admin-card !p-8 flex flex-col gap-6">
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">METADATA ARTIFACTS</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <label className="admin-label">TAXONOMY IDENTIFIERS</label>
                        <input className="admin-input" placeholder="e.g. AI, FUTURE, GADGETS" value={tags} onChange={e => setTags(e.target.value)} />
                        <p className="text-[8px] font-black text-gray-300 ml-1 tracking-widest uppercase">DELIMIT WITH COMMAS FOR DISTINCT TAGS</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Area - Industrial Square */}
          <div className="w-72 flex-shrink-0 border-l border-gray-100 p-6 flex flex-col gap-8 overflow-y-auto bg-gray-50/50">

            <div className="flex flex-col gap-4">
              <h3 className="text-[9px] font-black uppercase tracking-widest text-[#7a3983]">Category</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map(cat => (
                  <button key={cat} type="button" onClick={() => setCategory(cat)}
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-3 transition-all duration-100 border ${
                      category === cat 
                        ? 'bg-[#7a3983] text-white border-[#7a3983]' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-[#7a3983] hover:text-[#7a3983]'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[9px] font-black uppercase tracking-widest text-[#7a3983]">Upload Thumbnail</h3>
              <div className="relative group">
                {imagePreview ? (
                  <div className="relative border border-gray-100 bg-white p-1">
                    <img src={imagePreview} alt="" className="w-full aspect-video object-cover" />
                    <div className="absolute inset-0 bg-[#7a3983]/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }}
                            className="bg-white text-[#7a3983] py-1.5 px-4 font-black uppercase text-[9px] tracking-widest border border-white">
                            DELETE
                        </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="w-full aspect-video flex flex-col items-center justify-center gap-2 cursor-pointer bg-white border border-dashed border-[#7a3983]/50 hover:bg-[#7a3983]/[0.02] hover:border-[#7a3983]">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">Select Image</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </div>

            <div className="mt-auto px-1 opacity-0 pointer-events-none">
              {/* Spacer / Hidden footer element */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

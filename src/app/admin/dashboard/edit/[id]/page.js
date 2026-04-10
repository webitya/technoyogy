'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const RichEditor = dynamic(() => import('@/components/admin/RichEditor'), { ssr: false });

const CATEGORIES = ['TECH', 'LIFESTYLE', 'FUTURE', 'NEWS', 'AI', 'GADGETS', 'REVIEW'];

export default function EditBlog() {
  const params = useParams();
  const id = params?.id;
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('TECH');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const router = useRouter();
  const fileRef = useRef();

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setExcerpt(data.excerpt || '');
          setContent(data.content || '');
          setCategory(data.category || 'TECH');
          setTags(data.tags?.join(', ') || '');
          setExistingImage(data.image || '');
        }
      } catch (err) {
        setError('Failed to fetch blog data');
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

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
    if (!id) return;
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

      const res = await fetch(`/api/admin/blogs/${id}`, { 
        method: 'PUT', 
        body: formData 
      });
      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to update blog');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4 pt-20">
        <div className="w-12 h-12 border-4 border-[#7a3983] border-t-transparent rounded-[2px] animate-spin"></div>
        <p className="font-black text-gray-300 uppercase tracking-widest text-[9px] mt-4">FETCHING PERSISTENT DATA STATE</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <form onSubmit={handleSubmit}>
        {/* RE-ENGINEERED MASTER HEADER: Consolidated Navigation & Actions */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-8 py-3 border-b border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="p-2 border border-gray-200 text-gray-400 hover:text-primary transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/>
                </svg>
              </Link>
              <h1 className="text-[12px] font-black text-[#1a1a1a] uppercase tracking-widest italic">EDIT RECORD</h1>
            </div>

            {/* Integrated Tabs */}
            <div className="flex gap-0 border border-gray-100 rounded-[2px] overflow-hidden">
              {['content', 'seo'].map(tab => (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab ? 'bg-[#7a3983] text-white' : 'text-gray-400 bg-gray-50 hover:text-[#7a3983]'}`}>
                  {tab === 'content' ? 'DRAFTING' : 'VISIBILITY'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {error && <span className="text-[9px] font-black px-3 py-1.5 border border-primary text-primary tracking-widest uppercase">{error}</span>}
            <button type="submit" disabled={loading} className="admin-btn-primary text-[10px] !shadow-none !py-2.5">
              {loading ? (
                <><span className="w-3 h-3 border-2 border-white/20 border-t-white animate-spin" /> PERSISTING...</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> SAVE & OVERWRITE</>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-0 min-h-[calc(100vh-60px)]">
          <div className="flex-1">
            <div className="p-8">
            {activeTab === 'content' && (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <input
                    className="admin-input !text-lg !font-black !py-4 placeholder:text-gray-200"
                    placeholder="Enter Headline..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <textarea className="admin-input !text-base !font-bold resize-none border-gray-100 placeholder:text-gray-200" rows={2} value={excerpt} onChange={e => setExcerpt(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-4">
                  <RichEditor value={content} onChange={setContent} />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="flex flex-col gap-8 max-w-3xl">
                <div className="admin-card !p-8 flex flex-col gap-6">
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">METADATA ARTIFACTS</h3>
                  <div className="flex flex-col gap-3">
                    <label className="admin-label">TAXONOMY IDENTIFIERS</label>
                    <input className="admin-input" value={tags} onChange={e => setTags(e.target.value)} />
                    <p className="text-[8px] font-black text-gray-300 ml-1 tracking-widest uppercase">DELIMIT WITH COMMAS</p>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>

          <div className="w-72 flex-shrink-0 border-l border-gray-100 p-6 flex flex-col gap-8 bg-gray-50/50">
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
                {(imagePreview || existingImage) ? (
                  <div className="relative border border-gray-100 bg-white p-1">
                    <img src={imagePreview || existingImage} alt="" className="w-full aspect-video object-cover" />
                    <div className="absolute inset-0 bg-[#7a3983]/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); setExistingImage(''); }}
                            className="bg-white text-[#7a3983] py-1.5 px-4 font-black uppercase text-[9px] tracking-widest border border-white">
                            OVERWRITE MEDIA
                        </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="w-full aspect-video flex flex-col items-center justify-center gap-2 cursor-pointer bg-white border border-dashed border-[#7a3983]/50 hover:bg-[#7a3983]/[0.02] hover:border-[#7a3983]">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
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

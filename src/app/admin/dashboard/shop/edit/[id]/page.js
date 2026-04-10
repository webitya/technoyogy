'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditProduct() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [buyLink, setBuyLink] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch('/api/admin/shop');
      const data = await res.json();
      const product = data.find(p => p._id === id);
      if (product) {
        setTitle(product.title);
        setDescription(product.description);
        setImages(product.images);
        setBuyLink(product.buyLink);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImageField = () => setImages([...images, '']);
  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  const handleRemoveImageField = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('updating');
    
    // We reuse the POST route logic or create a PUT route. 
    // Usually admin shop API should support PUT. Let's create it.
    try {
      const res = await fetch(`/api/admin/shop/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, images, buyLink }),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => router.push('/admin/dashboard/shop'), 1500);
      } else {
        setStatus('error');
      }
    } catch (error) {
       setStatus('error');
    }
  };

  if (loading) return <div className="p-8 font-black uppercase text-[10px] text-gray-400">Loading Product Data...</div>;

  return (
    <div className="p-8 min-h-screen bg-[#fcfcfc]">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/admin/dashboard/shop" className="p-2 bg-white border border-gray-100 rounded-[2px] text-gray-400 hover:text-[#7a3983] transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-widest uppercase">EDIT PRODUCT</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl flex flex-col gap-8">
        <div className="admin-card grid gap-8">
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <label className="admin-label">PRODUCT TITLE</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="admin-label">BRIEF DESCRIPTION</label>
              <textarea required rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="admin-input resize-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="admin-label">BUY LINK</label>
              <input type="url" required value={buyLink} onChange={(e) => setBuyLink(e.target.value)} className="admin-input" />
            </div>
          </div>

          <div className="border-t border-gray-50 pt-6">
            <div className="flex items-center justify-between mb-4">
               <label className="admin-label !mb-0">IMAGE ASSETS</label>
               <button type="button" onClick={handleAddImageField} className="text-[10px] font-black text-[#7a3983] uppercase tracking-widest hover:underline">
                  + Add Slot
               </button>
            </div>
            <div className="grid gap-6">
              {images.map((img, idx) => (
                <div key={idx} className="flex flex-col gap-3 p-4 border border-gray-50 bg-gray-50/30 rounded-[2px]">
                  <div className="flex gap-2">
                    <input type="url" required value={img} onChange={(e) => handleImageChange(idx, e.target.value)} className="admin-input flex-1" />
                    <button type="button" onClick={() => handleRemoveImageField(idx)} className="p-3 text-gray-300 hover:text-rose-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5} /></svg>
                    </button>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="flex-1">
                        <ImageUpload label={`UPDATE ASSET ${idx + 1}`} onUpload={(url) => handleImageChange(idx, url)} />
                     </div>
                     {img && (
                        <div className="w-20 h-20 border border-gray-100 rounded-[2px] overflow-hidden bg-white">
                           <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" disabled={status === 'updating'} className="admin-btn-primary py-4 px-12 self-end">
          {status === 'updating' ? 'SYNCHRONIZING...' : 'UPDATE PRODUCT ASSET'}
        </button>
      </form>
    </div>
  );
}

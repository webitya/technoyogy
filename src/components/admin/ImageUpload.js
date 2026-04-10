'use client';
import { useState } from 'react';

export default function ImageUpload({ onUpload, label = "UPLOAD ASSET" }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onUpload(data.url);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="admin-label">{label}</label>
      <div className="relative group overflow-hidden">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className={`p-4 border border-dashed border-[#7a3983]/30 rounded-[2px] transition-all flex items-center justify-center gap-3 bg-white group-hover:border-[#7a3983] ${uploading ? 'opacity-50' : ''}`}>
          {uploading ? (
             <div className="w-4 h-4 border-2 border-[#7a3983]/30 border-t-[#7a3983] rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4 text-[#7a3983]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002-2z" />
            </svg>
          )}
          <span className="text-[10px] font-black uppercase tracking-widest text-[#7a3983]">
            {uploading ? 'UPLOADING...' : 'SELECT IMAGE ASSET'}
          </span>
        </div>
      </div>
    </div>
  );
}

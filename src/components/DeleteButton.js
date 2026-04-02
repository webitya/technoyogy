'use client';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;
    const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete blog');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 border border-gray-100 bg-white text-gray-400 hover:border-primary hover:text-primary transition-all rounded-[3px]"
      title="DELETE RECORD"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </button>
  );
}

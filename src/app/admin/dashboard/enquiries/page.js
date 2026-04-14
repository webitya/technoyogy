'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function EnquiriesContent() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ total: 0, pages: 0 });
  const [processing, setProcessing] = useState(null);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 10;
  const router = useRouter();

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries?page=${page}&limit=${limit}`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries);
        setMeta({ total: data.total, pages: data.pages });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm('Permanently remove this enquiry?')) return;
    setProcessing(`delete-${id}`);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchEnquiries();
      }
    } catch (err) {
      alert('Delete failed');
    } finally {
      setProcessing(null);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setProcessing(`${status}-${id}`);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchEnquiries();
      }
    } catch (err) {
      alert('Update failed');
    } finally {
      setProcessing(null);
    }
  };

  if (loading && enquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
        <div className="w-10 h-10 border-4 border-[#7a3983] border-t-transparent rounded-[2px] animate-spin"></div>
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">FETCHING COMMUNICATION LOGS</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-[#fcfcfc]">
      <div className="flex flex-col gap-0.5 mb-8">
        <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-widest uppercase">ENQUIRIES</h1>
      </div>

      <div className="admin-card !p-0 shadow-sm border-gray-100 bg-white rounded-[3px]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-[#7a3983]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2 className="font-bold text-[#1a1a1a] text-xs uppercase tracking-widest">INCOMING DISPATCHES</h2>
          </div>
          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">TOTAL: {meta.total} ENTRIES</p>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-sm admin-table">
            <thead>
              <tr>
                <th className="text-left w-[200px] uppercase font-bold text-[10px] tracking-widest text-gray-400">SENDER IDENTITY</th>
                <th className="text-left w-[180px] uppercase font-bold text-[10px] tracking-widest text-gray-400">SUBJECT</th>
                <th className="text-left uppercase font-bold text-[10px] tracking-widest text-gray-400">MESSAGE INTENT</th>
                <th className="text-left hidden md:table-cell uppercase font-bold text-[10px] tracking-widest text-gray-400">STAMP</th>
                <th className="text-right uppercase font-bold text-[10px] tracking-widest text-gray-400">OPS</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? enquiries.map((enq) => (
                <tr key={enq._id} className="group transition-colors border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="!pl-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#1a1a1a] text-[11px] uppercase tracking-tight">{enq.name}</p>
                          {enq.status === 'READ' && <span className="text-[7px] bg-green-50 text-green-600 px-1 rounded-[1px] font-bold border border-green-100">READ</span>}
                          {enq.status === 'REJECTED' && <span className="text-[7px] bg-red-50 text-red-600 px-1 rounded-[1px] font-bold border border-red-100">REJECTED</span>}
                          {(!enq.status || enq.status === 'NEW') && <span className="text-[7px] bg-blue-50 text-blue-600 px-1 rounded-[1px] font-bold border border-blue-100 animate-pulse">NEW</span>}
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 mt-0.5 tracking-tighter uppercase">{enq.email}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-[2px] border border-gray-100 bg-gray-50 text-gray-500">
                      {enq.subject || 'GENERAL'}
                    </span>
                  </td>
                  <td>
                    <p className="text-[11px] font-medium text-gray-500 line-clamp-2 max-w-md uppercase tracking-tighter leading-tight">
                      &quot;{enq.message}&quot;
                    </p>
                  </td>
                  <td className="hidden md:table-cell text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                  </td>
                  <td className="!pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {enq.status !== 'READ' && (
                        <button 
                          onClick={() => handleStatusUpdate(enq._id, 'READ')}
                          disabled={processing === `READ-${enq._id}`}
                          className="p-2 border border-gray-100 bg-white text-gray-400 hover:border-green-500 hover:text-green-500 transition-all rounded-[2px] disabled:opacity-50" title="MARK AS READ">
                            {processing === `READ-${enq._id}` ? (
                              <div className="w-3.5 h-3.5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                        </button>
                      )}
                      {enq.status !== 'REJECTED' && (
                        <button 
                          onClick={() => handleStatusUpdate(enq._id, 'REJECTED')}
                          disabled={processing === `REJECTED-${enq._id}`}
                          className="p-2 border border-gray-100 bg-white text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all rounded-[2px] disabled:opacity-50" title="REJECT">
                            {processing === `REJECTED-${enq._id}` ? (
                              <div className="w-3.5 h-3.5 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(enq._id)}
                        disabled={processing === `delete-${enq._id}`}
                        className="p-2 border border-gray-100 bg-white text-gray-400 hover:border-red-500 hover:text-red-500 transition-all rounded-[2px] disabled:opacity-50" title="DELETE">
                          {processing === `delete-${enq._id}` ? (
                            <div className="w-3.5 h-3.5 border-2 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          )}
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-[2px] bg-gray-50 flex items-center justify-center text-gray-200 border border-gray-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <p className="font-bold text-gray-300 uppercase tracking-widest text-[10px]">NO DISPATCHES RECEIVED YET</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer - Sharp & Compact */}
        {meta.pages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              MESSAGE LOG: {(page - 1) * limit + 1} TO {Math.min(page * limit, meta.total)} OF {meta.total}
            </p>
            <div className="flex items-center gap-1">
              <Link href={`/admin/dashboard/enquiries?page=${page - 1}`}
                className={`p-2 border border-gray-100 bg-white transition-all rounded-[3px] ${page <= 1 ? 'opacity-20 pointer-events-none' : 'hover:border-[#7a3983] hover:text-[#7a3983] text-gray-400'}`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
              </Link>
              <div className="flex items-center gap-0.5">
                {[...Array(meta.pages)].map((_, i) => (
                  <Link key={i} href={`/admin/dashboard/enquiries?page=${i + 1}`}
                    className={`min-w-[28px] h-7 flex items-center justify-center text-[10px] font-bold border transition-all rounded-[3px] ${page === i + 1 ? 'bg-[#7a3983] text-white border-[#7a3983]' : 'bg-white border-gray-100 text-gray-400 hover:text-[#7a3983]'}`}>
                    {(i + 1).toString().padStart(2, '0')}
                  </Link>
                ))}
              </div>
              <Link href={`/admin/dashboard/enquiries?page=${page + 1}`}
                className={`p-2 border border-gray-100 bg-white transition-all rounded-[3px] ${page >= meta.pages ? 'opacity-20 pointer-events-none' : 'hover:border-[#7a3983] hover:text-[#7a3983] text-gray-400'}`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EnquiriesPage() {
  return (
    <Suspense fallback={
       <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
         <div className="w-10 h-10 border-4 border-[#7a3983] border-t-transparent rounded-[2px] animate-spin"></div>
         <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">INITIALIZING UPLINK...</p>
       </div>
    }>
      <EnquiriesContent />
    </Suspense>
  );
}

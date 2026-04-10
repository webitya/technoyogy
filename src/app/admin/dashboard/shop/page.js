'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ShopAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/shop');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/shop/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#fcfcfc]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-widest uppercase">SHOP INVENTORY</h1>
        <Link href="/admin/dashboard/shop/new" className="admin-btn-primary py-2.5 px-6">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          ADD PRODUCT
        </Link>
      </div>

      <div className="admin-card !p-0 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
           <div className="flex items-center gap-3">
             <h2 className="font-black text-[#1a1a1a] text-xs uppercase tracking-widest">PRODUCT ARCHIVE</h2>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm admin-table">
            <thead>
              <tr>
                <th className="text-left">PRODUCT</th>
                <th className="text-left">DESCRIPTION</th>
                <th className="text-right">OPS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="py-10 text-center uppercase tracking-widest text-[10px] text-gray-400 font-bold">Initializing Inventory...</td></tr>
              ) : products.length > 0 ? products.map((product) => (
                <tr key={product._id} className="group transition-colors border-b border-gray-50 last:border-0 hover:bg-gray-50/30">
                  <td className="!pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-[2px] overflow-hidden border border-gray-100 flex-shrink-0 bg-white">
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-[#1a1a1a] truncate max-w-[200px] text-[11px] uppercase tracking-tight">{product.title}</p>
                        <p className="text-[8px] font-bold text-gray-400 mt-0.5 tracking-widest uppercase">IMAGES: {product.images.length}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-[10px] font-medium text-gray-500 line-clamp-1 max-w-[300px]">{product.description}</p>
                  </td>
                  <td className="!pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/admin/dashboard/shop/edit/${product._id}`} className="p-2 rounded-[2px] transition-all border border-gray-100 bg-white hover:border-[#7a3983] hover:text-[#7a3983]" title="EDIT">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/>
                        </svg>
                      </Link>
                      <button onClick={() => deleteProduct(product._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-[2px] transition-all" title="DELETE">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={3} className="py-20 text-center uppercase tracking-widest text-[10px] text-gray-300 font-bold">NO PRODUCTS FOUND</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

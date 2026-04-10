import clientPromise from '@/lib/mongodb';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Technoyogyai Shop - Tactical Tech Assets',
  description: 'Curated technology assets, gadgets, and lifestyle engineering tools.',
};

async function getProducts() {
  try {
    const client = await clientPromise;
    const db = client.db('technoyogy');
    const products = await db.collection('products').find({}).sort({ createdAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
}

export default async function Shop() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero / Header Section */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter uppercase leading-none">
              TACTICAL <span className="text-[#7a3983]">SHOP.</span>
            </h1>
            <p className="text-gray-400 text-xs font-black uppercase tracking-[4px] mt-2">
              Curated Assets For High-Fidelity Lifestyles
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center flex flex-col items-center gap-4">
               <div className="w-16 h-16 border border-gray-100 flex items-center justify-center text-gray-200 uppercase font-black text-[9px] rounded-full">EMPTY</div>
               <p className="font-black text-gray-300 uppercase tracking-widest text-[11px]">Deploying Inventory. Please Synchronize Later.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

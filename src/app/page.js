import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialStats from '@/components/SocialStats';
import Footer from '@/components/Footer';
import HomeBlogs from '@/components/HomeBlogs';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <div className="py-12"><SocialStats /></div>

      {/* Blog Section - Compact & Modern */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-2 mb-16">
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-widest uppercase italic border-b-4 border-[#fb2576] pb-2">LATEST <span className="text-[#fb2576]">INSIGHTS</span></h2>
            <p className="text-gray-400 max-w-xl text-xs font-black uppercase tracking-widest mt-4">Exploring Future Tech & Tactical Creativity</p>
          </div>

          <HomeBlogs />

          <div className="flex justify-center mt-20">
            <Link href="/blogs" className="admin-btn-primary py-4 px-12 text-sm tracking-widest rounded-full shadow-xl shadow-primary/20">VIEW ALL PUBLISHED RECORDS</Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Industrial Style */}
      <section className="py-32 overflow-hidden relative bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[480px] rounded-[5px] overflow-hidden shadow-2xl group border-4 border-gray-100">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="CTA" className="object-cover w-full h-full transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <div className="absolute top-8 left-8 text-white font-black tracking-widest uppercase text-[10px] bg-primary px-4 py-2 rounded-[2px] shadow-xl">DIRECTIVE ALPHA</div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[#fb2576] font-black tracking-[4px] uppercase text-[10px]">EVOLVE WITH TECHNOYOGYX</span>
            <h2 className="text-5xl font-black leading-[1.1] text-[#1a1a1a] tracking-tight uppercase italic underline decoration-[4px] decoration-primary transition-all hover:decoration-[8px]">Leading The International Tech Narrative.</h2>
            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              We benchmark cross-functional technology and lifestyle innovations to keep you ahead in a fast-paced digital ecosystem.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <Link href="/contact" className="admin-btn-primary py-3.5 px-10 rounded-[3px] text-xs">CREATE COLLABORATION</Link>
              <div className="flex items-center gap-4 group cursor-pointer px-6 py-3 border border-gray-100 rounded-[3px] hover:border-primary transition-all">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:text-primary group-hover:bg-primary/[0.03] transition-all">
                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span className="font-black text-[10px] uppercase tracking-widest">Watch Presentation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

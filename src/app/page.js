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
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-widest uppercase italic border-b-4 border-[#7a3983] pb-2">LATEST <span className="text-[#7a3983]">INSIGHTS</span></h2>
            <p className="text-gray-400 max-w-xl text-xs font-black uppercase tracking-widest mt-4">Exploring Future Tech & Tactical Creativity</p>
          </div>

          <HomeBlogs />

          <div className="flex justify-center mt-20">
            <Link href="/blogs" className="admin-btn-primary py-4 px-12 text-sm tracking-widest rounded-full shadow-xl shadow-primary/20">VIEW ALL PUBLISHED RECORDS</Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Industrial Style */}
      <section className="py-16 sm:py-24 overflow-hidden relative bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="relative h-[320px] sm:h-[480px] rounded-[3px] overflow-hidden shadow-xl group border-2 border-gray-50 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="CTA" className="object-cover w-full h-full transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all">
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            <span className="text-[#7a3983] font-bold tracking-[3px] uppercase text-[9px]">Evolve With Technoyogyai</span>
            <h2 className="text-3xl sm:text-5xl font-bold leading-[1.1] text-[#1a1a1a] tracking-tight uppercase border-b-4 border-primary/20 pb-2">Leading The International Tech Narrative.</h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-medium max-w-lg">
              We benchmark cross-functional technology and lifestyle innovations to keep you ahead in a fast-paced digital ecosystem.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link href="/contact" className="admin-btn-primary py-3.5 px-10 rounded-[2px] text-[10px] uppercase font-bold tracking-widest shadow-xl shadow-primary/20">CREATE COLLABORATION</Link>
              <Link href="#" className="flex items-center gap-4 group cursor-pointer px-8 py-3.5 border-2 border-[#1a1a1a]/20 transition-all rounded-[2px] hover:border-primary">
                <div className="w-5 h-5 flex items-center justify-center text-[#1a1a1a] group-hover:text-primary transition-all">
                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#1a1a1a] group-hover:text-primary">Watch Presentation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

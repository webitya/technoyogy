'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-start pt-20 md:pt-15 overflow-hidden bg-white">
      {/* Background Decor - Refined & Tactical */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-[#fb2576]/[0.02] -z-10 rounded-l-[150px] md:rounded-l-[200px] border-l border-gray-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] rotate-12 scale-150" style={{ backgroundImage: 'radial-gradient(#fb2576 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="flex flex-col gap-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] text-[#1a1a1a] uppercase tracking-tight pt-4">
            DECODING THE <br />
            <span className="text-[#fb2576]">NEXT GEN</span> OF <br />
            TECHNOLOGY.
          </h1>
          <p className="text-lg text-gray-500 max-w-lg font-medium leading-relaxed">
            A high-fidelity tactical content studio by <span className="text-[#1a1a1a] font-bold">Yog Prakash Sah</span>. Exploring future tech, tactical productivity, and lifestyle engineering.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/blogs" className="admin-btn-primary py-4 px-10 text-[11px] rounded-[3px] shadow-xl shadow-primary/20">EXPLORE ARCHIVES</Link>
            <Link href="/about" className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest border-2 border-[#1a1a1a]/20 text-[#1a1a1a] rounded-[3px] hover:border-primary hover:text-primary transition-all">ABOUT ME</Link>
          </div>
        </motion.div>

        {/* Right Content - Compact Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[500px] md:h-[650px] w-full flex justify-center items-center"
        >
          <div className="relative w-full h-full max-w-[500px]">
            <img
              src="/hero-blogger.png"
              alt="Yog Prakash Sah"
              className="w-full h-full object-cover rounded-[5px] shadow-2xl relative z-10 grayscale-[0.2] hover:grayscale-0 transition-all duration-700 border-4 border-white"
            />
            {/* Design Element - Social Card */}
             <div className="absolute -bottom-6 -right-6 bg-white p-5 border border-gray-100 shadow-2xl z-20 hidden lg:block rounded-[2px]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#fb2576] flex items-center justify-center text-white font-black text-[10px]">TG</div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase tracking-widest">JOIN COMMAND</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-0.5">@TECHNOGRAPHYX</p>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

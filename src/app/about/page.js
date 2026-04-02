import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Bot, Smartphone, Rocket, Brain, Code, Globe } from 'lucide-react';

export const metadata = {
  title: 'About - Technoyogyx | Yog Prakash Sah',
  description: 'Learn about Yog Prakash Sah, the founder of Technoyogyx – a technology blogger sharing deep insights on future tech and digital lifestyle.',
};

export default function About() {
  const topics = [
    { icon: <Bot size={32} />, title: 'Artificial Intelligence', desc: 'Deep dives into AI, machine learning, LLMs, and how they reshape our work and daily routines.' },
    { icon: <Smartphone size={32} />, title: 'Gadgets & Devices', desc: 'Honest, detailed reviews of the latest smartphones, wearables, and consumer tech from around the world.' },
    { icon: <Rocket size={32} />, title: 'Startup & Future Tech', desc: 'Stories from the frontier of technology — startups, disruptive innovations, and the next big thing.' },
    { icon: <Brain size={32} />, title: 'Digital Productivity', desc: 'Tools, systems, and frameworks to help you work smarter, focus better, and achieve more.' },
    { icon: <Code size={32} />, title: 'Software & Dev', desc: 'Programming insights, dev tools, and best practices for modern software engineers and enthusiasts.' },
    { icon: <Globe size={32} />, title: 'Digital Lifestyle', desc: 'How technology shapes culture, creativity, and the way we live, connect, and experience the world.' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[45%] h-full bg-[#fb2576]/[0.02] -z-10 rounded-bl-[200px] border-l border-gray-50 flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03] rotate-12 scale-150" style={{ backgroundImage: 'radial-gradient(#fb2576 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#fb2576]"></div>
               <span className="text-[#fb2576] font-black uppercase tracking-[3px] text-[10px]">THE IDENTITY</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight italic uppercase text-[#1a1a1a]">
              YOG <span className="text-[#fb2576]">PRAKASH</span> <br/> SAH.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              A high-fidelity technology blogger and the founder of <span className="text-[#1a1a1a] font-black">Technoyogyx</span>. We decode the intersection of modern innovation and tactical productivity.
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-[3px] min-w-[140px] shadow-sm">
                <span className="text-4xl font-black text-[#fb2576] tracking-tighter">05+</span>
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-1">YEARS BLOGGING</span>
              </div>
              <div className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-[3px] min-w-[140px] shadow-sm">
                <span className="text-4xl font-black text-[#1a1a1a] tracking-tighter">200+</span>
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-1">ARTIFACTS PUBLISHED</span>
              </div>
              <div className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-[3px] min-w-[140px] shadow-sm">
                <span className="text-4xl font-black text-[#1a1a1a] tracking-tighter">15M+</span>
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-1">GLOBAL REACH</span>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] group">
            <div className="absolute inset-0 bg-[#fb2576]/[0.03] rounded-[3px] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
            <img
              src="/hero-blogger.png"
              alt="Yog Prakash Sah"
              className="w-full h-full object-cover rounded-[3px] shadow-2xl relative z-10 border-4 border-white grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Expertise Section - Industrial Grid */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-4 mb-20">
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-widest uppercase italic border-b-4 border-[#fb2576] pb-2">THE <span className="text-[#fb2576]">EDITORIAL</span> FOCUS</h2>
            <p className="text-gray-400 max-w-xl text-xs font-black uppercase tracking-widest mt-4">Defining the Next Paradigm of Technology Journalism</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((item, i) => (
              <div key={i} className="flex flex-col gap-6 p-10 bg-white border border-gray-100 rounded-[3px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-16 h-16 rounded-[2px] bg-gray-50 flex items-center justify-center text-[#fb2576] group-hover:bg-[#fb2576] group-hover:text-white transition-all border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-[#1a1a1a] uppercase tracking-tight italic leading-none">{item.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-10 items-center relative z-10">
          <div className="flex items-center gap-4">
             <div className="w-8 h-[2px] bg-gray-100"></div>
             <span className="text-gray-300 font-black uppercase tracking-[5px] text-[10px]">CORE PHILOSOPHY</span>
             <div className="w-8 h-[2px] bg-gray-100"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter text-[#1a1a1a] uppercase italic underline decoration-primary decoration-[6px]">
            TECHNOLOGY SHOULD BE <span className="text-primary italic underline-none">HUMAN-FIRST.</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed font-medium">
             I believe the best technology serves people — not the other way around. Through <span className="text-[#1a1a1a] font-black">Technoyogyx</span>, I aim to bridge the gap between complex innovation and everyday understanding, empowering readers to make thoughtful choices in a hyper-connected world.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

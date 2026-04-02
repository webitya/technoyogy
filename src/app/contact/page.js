'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Bot } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header - Industrial & High Density */}
      <section className="pt-48 pb-12 relative overflow-hidden bg-white border-b border-gray-50">
         <div className="absolute top-0 right-0 w-[40%] h-full bg-[#fb2576]/[0.01] -z-10 rounded-bl-[150px] border-l border-gray-50 overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-[0.03] rotate-12 scale-150" style={{ backgroundImage: 'radial-gradient(#fb2576 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
         </div>
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-2">
               <span className="text-[#fb2576] font-black uppercase tracking-[5px] text-[9px] italic">COMMUNICATION_UPLINK</span>
               <h1 className="text-5xl md:text-6xl font-black text-[#1a1a1a] leading-none tracking-tight uppercase italic">
                  GET IN <span className="text-[#fb2576]">TOUCH.</span>
               </h1>
            </div>
         </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-[1fr_2fr] gap-20 items-start">
        {/* Left Column: Direct Access */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
             <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[4px]">PRIMARY ACCESS</h3>
             <div className="h-[2px] w-8 bg-[#fb2576]"></div>
          </div>

          <div className="flex flex-col gap-4">
             <a href="mailto:contact@technoyogyx.com" className="group flex items-center gap-4 p-5 border border-gray-100 rounded-[3px] bg-white hover:border-[#fb2576] transition-all shadow-sm">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-[#fb2576] group-hover:bg-[#fb2576] group-hover:text-white transition-all rounded-[1px]">
                   <Mail size={18} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">EMAIL_UPLINK</span>
                   <span className="text-xs font-black text-[#1a1a1a] uppercase tracking-tight">CONTACT@TECHNOYOGYX.COM</span>
                </div>
             </a>
          </div>

          {/* Social Registry */}
          <div className="flex flex-col gap-6">
             <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[4px]">SOCIAL_REGISTRY</h3>
                <div className="h-[2px] w-8 bg-gray-100"></div>
             </div>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'FACEBOOK', href: SOCIAL_LINKS.facebook },
                  { label: 'INSTAGRAM', href: SOCIAL_LINKS.instagram },
                  { label: 'YOUTUBE', href: SOCIAL_LINKS.youtube },
                  { label: 'TELEGRAM', href: SOCIAL_LINKS.telegram },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" 
                     className="p-3 border border-gray-100 flex items-center justify-center text-[9px] font-black text-gray-400 hover:border-[#fb2576] hover:text-[#fb2576] transition-all rounded-[1px] uppercase tracking-widest">
                    {s.label}
                  </a>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <div className="bg-white border border-gray-100 rounded-[3px] p-8 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Bot size={80} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
            <div className="flex flex-col gap-1">
               <h2 className="text-2xl font-black text-[#1a1a1a] uppercase italic tracking-tighter">TRANSMIT MESSAGE</h2>
               <p className="text-[9px] font-black text-gray-300 uppercase tracking-[4px]">AUTHENTICATED COMMUNICATION CHANNEL</p>
            </div>

            <AnimatePresence>
              {status === 'sent' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-green-50 border border-green-100 text-green-700 text-[10px] font-black uppercase tracking-[3px] text-center rounded-[2px]">
                  DATA_PACKET_TRANSFERRED_SUCCESSFULLY.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-red-50 border border-red-100 text-red-700 text-[10px] font-black uppercase tracking-[3px] text-center rounded-[2px]">
                  CRITICAL_ERROR: CONNECTION_ABORTED.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3 group">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] group-focus-within:text-[#fb2576] transition-colors">NAME_IDENTIFIER</label>
                <input name="name" type="text" required placeholder="EG. YOG PRAKASH" value={form.name} onChange={handleChange}
                  className="bg-transparent border-b-2 border-gray-100 focus:border-[#fb2576] outline-none py-3 font-black text-sm uppercase tracking-tight transition-all placeholder:text-gray-200" />
              </div>
              <div className="flex flex-col gap-3 group">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] group-focus-within:text-[#fb2576] transition-colors">VIRTUAL_ADDRESS</label>
                <input name="email" type="email" required placeholder="EG. YOU@MAIL.COM" value={form.email} onChange={handleChange}
                  className="bg-transparent border-b-2 border-gray-100 focus:border-[#fb2576] outline-none py-3 font-black text-sm uppercase tracking-tight transition-all placeholder:text-gray-200" />
              </div>
            </div>

            <div className="flex flex-col gap-3 group">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] group-focus-within:text-[#fb2576] transition-colors">SUBJECT_CATEGORY</label>
              <input name="subject" type="text" required placeholder="COLLAB / INQUIRY / TACTICAL" value={form.subject} onChange={handleChange}
                className="bg-transparent border-b-2 border-gray-100 focus:border-[#fb2576] outline-none py-3 font-black text-sm uppercase tracking-tight transition-all placeholder:text-gray-200" />
            </div>

            <div className="flex flex-col gap-3 group">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] group-focus-within:text-[#fb2576] transition-colors">DATA_LOGS_INPUT</label>
              <textarea name="message" required rows={4} placeholder="INITIATE RAW CONTENT TRANSMISSION..." value={form.message} onChange={handleChange}
                className="bg-transparent border-b-2 border-gray-100 focus:border-[#fb2576] outline-none py-3 font-black text-sm uppercase tracking-tight transition-all placeholder:text-gray-200 resize-none" />
            </div>

            <button type="submit" disabled={status === 'sending'} className="mt-4 bg-[#fb2576] text-white py-5 text-[11px] font-black uppercase tracking-[5px] rounded-[3px] shadow-xl shadow-[#fb2576]/20 group relative overflow-hidden transition-all hover:bg-[#d81b60] active:scale-95 disabled:bg-gray-400">
               <span className="relative z-10">{status === 'sending' ? 'TRANSMITTING...' : 'INITIATE UPLINK_'}</span>
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

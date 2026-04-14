'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, User, AtSign, Send } from 'lucide-react';
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

      {/* Header */}
      <section className="pt-24 md:pt-32 pb-8 bg-white border-b border-gray-100/50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-1">
               <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-none tracking-tight uppercase">
                  CONTACT <span className="text-[#7a3983]">US.</span>
               </h1>
               <p className="text-gray-400 text-sm font-medium max-w-xl">
                  Reach out through our official channels for proposals or inquiries.
               </p>
            </div>
         </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
        {/* Left Column: Contact Info */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
             <h3 className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest border-l-4 border-[#7a3983] pl-3">Official Uplink</h3>
             <a href="mailto:yogsah.business@gmail.com" className="group flex items-center gap-3 p-5 border border-gray-100 rounded-[3px] bg-white hover:border-[#7a3983] transition-all shadow-sm">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-[#7a3983] group-hover:bg-[#7a3983] group-hover:text-white transition-all rounded-[2px]">
                   <Mail size={16} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-[#1a1a1a] transition-colors group-hover:text-[#7a3983] truncate max-w-[200px]">yogsah.business@gmail.com</span>
                </div>
             </a>
          </div>

          <div className="flex flex-col gap-4">
             <h3 className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest border-l-4 border-[#7a3983] pl-3">Registry</h3>
             <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'Facebook', href: SOCIAL_LINKS.facebook },
                  { label: 'Instagram', href: SOCIAL_LINKS.instagram },
                  { label: 'YouTube', href: SOCIAL_LINKS.youtube },
                  { label: 'Telegram', href: SOCIAL_LINKS.telegram },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" 
                     className="p-2.5 border border-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-400 hover:border-[#7a3983] hover:text-[#7a3983] hover:bg-[#7a3983]/[0.02] transition-all rounded-[2px] uppercase tracking-widest">
                    {s.label}
                  </a>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-2 bg-white border border-gray-100 rounded-[3px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <AnimatePresence>
            {status === 'sent' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center text-center p-6"
              >
                <div className="w-20 h-20 bg-[#7a3983]/10 rounded-full flex items-center justify-center text-[#7a3983] mb-6 animate-bounce">
                  <Send size={40} />
                </div>
                <h2 className="text-3xl font-bold text-[#1a1a1a] uppercase mb-2">Thank You!</h2>
                <p className="text-gray-500 font-medium mb-8">Your message has been received successfully.<br/>We will contact you soon.</p>
                <button 
                  onClick={() => setStatus('')}
                  className="px-8 py-3 bg-[#7a3983] text-white text-[10px] font-bold uppercase tracking-widest rounded-[2px]"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-1 mb-8">
             <h2 className="text-xl font-bold text-[#1a1a1a] uppercase tracking-tight">Send Message</h2>
             <p className="text-[10px] font-medium text-gray-300 uppercase tracking-widest">Global response time: 24h</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 group">
                <div className="flex items-center gap-2 text-gray-300 group-focus-within:text-[#7a3983] transition-colors">
                  <User size={12} />
                  <label className="text-[9px] font-bold uppercase tracking-widest">Full Name</label>
                </div>
                <input name="name" type="text" required placeholder="John Doe" value={form.name} onChange={handleChange}
                  className="bg-transparent border-b-2 border-[#7a3983]/20 focus:border-[#7a3983] outline-none py-2 font-bold text-sm transition-all placeholder:text-gray-100" />
              </div>
              <div className="flex flex-col gap-2 group">
                <div className="flex items-center gap-2 text-gray-300 group-focus-within:text-[#7a3983] transition-colors">
                  <AtSign size={12} />
                  <label className="text-[9px] font-bold uppercase tracking-widest">Email Address</label>
                </div>
                <input name="email" type="email" required placeholder="john@example.com" value={form.email} onChange={handleChange}
                  className="bg-transparent border-b-2 border-[#7a3983]/20 focus:border-[#7a3983] outline-none py-2 font-bold text-sm transition-all placeholder:text-gray-100" />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <div className="flex items-center gap-2 text-gray-300 group-focus-within:text-[#7a3983] transition-colors">
                <MessageSquare size={12} />
                <label className="text-[9px] font-bold uppercase tracking-widest">Subject</label>
              </div>
              <input name="subject" type="text" required placeholder="Collaboration Inquiry" value={form.subject} onChange={handleChange}
                className="bg-transparent border-b-2 border-[#7a3983]/20 focus:border-[#7a3983] outline-none py-2 font-bold text-sm transition-all placeholder:text-gray-100" />
            </div>

            <div className="flex flex-col gap-2 group">
              <div className="flex items-center gap-2 text-gray-300 group-focus-within:text-[#7a3983] transition-colors">
                <Send size={12} />
                <label className="text-[9px] font-bold uppercase tracking-widest">Your Message</label>
              </div>
              <textarea name="message" required rows={3} placeholder="Type your message here..." value={form.message} onChange={handleChange}
                className="bg-transparent border-b-2 border-[#7a3983]/20 focus:border-[#7a3983] outline-none py-2 font-bold text-sm transition-all placeholder:text-gray-100 resize-none" />
            </div>

            <button type="submit" disabled={status === 'sending'} className="mt-2 bg-[#7a3983] text-white py-4 text-[10px] font-bold uppercase tracking-[4px] rounded-[3px] shadow-xl shadow-[#7a3983]/20 group relative overflow-hidden transition-all hover:bg-[#d81b60] active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3">
               {status === 'sending' ? (
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
               ) : (
                 <Send size={14} />
               )}
               <span>{status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}</span>
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

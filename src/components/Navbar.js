'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialIcons = [
    { href: SOCIAL_LINKS.facebook, icon: 'FB', label: 'Facebook' },
    { href: SOCIAL_LINKS.instagram, icon: 'IG', label: 'Instagram' },
    { href: SOCIAL_LINKS.youtube, icon: 'YT', label: 'YouTube' },
    { href: SOCIAL_LINKS.telegram, icon: 'TG', label: 'Telegram' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-sm' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative h-8 w-auto flex items-center gap-3 group">
            <img src="/technoyogylogo.png" alt="" className="h-full w-auto object-contain transition-transform group-hover:scale-110" />
            <span className={`text-xl font-black tracking-tighter transition-colors group-hover:text-primary ${isOpen ? 'text-black' : 'text-foreground'}`}>
              Technoyogy<span className="text-primary italic">x</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center font-bold uppercase tracking-widest text-[11px]">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/admin" className="px-5 py-2 bg-primary text-white rounded-[2px] hover:shadow-lg hover:shadow-primary/20 transition-all">Sign In</Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-foreground relative z-[101]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} className="text-[#fb2576]" /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Full-Height Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-[400px] h-full bg-white z-[120] md:hidden shadow-2xl flex flex-col p-8"
            >
              <div className="flex flex-col h-full">
                <div className="mb-12">
                   <h2 className="text-2xl font-black italic tracking-tighter mb-1 uppercase">Technoyogy<span className="text-primary">x</span></h2>
                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">TACTICAL INSIGHTS HUB</p>
                </div>

                <div className="flex flex-col gap-8 text-2xl font-black uppercase italic tracking-tighter text-[#1a1a1a]">
                  <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors w-fit border-b-4 border-transparent hover:border-primary">Home</Link>
                  <Link href="/blogs" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors w-fit border-b-4 border-transparent hover:border-primary">Blogs</Link>
                  <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors w-fit border-b-4 border-transparent hover:border-primary">About</Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors w-fit border-b-4 border-transparent hover:border-primary">Contact</Link>
                </div>

                <div className="mt-auto">
                    <Link href="/admin" onClick={() => setIsOpen(false)} className="block w-full text-center py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-[2px] shadow-xl shadow-primary/20 mb-8">
                       Authorized Sign In
                    </Link>

                    <div className="flex flex-col gap-4">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">CONNECTED PERSPECTIVES</p>
                        <div className="flex gap-4">
                            {socialIcons.map(social => (
                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" 
                                    className="w-10 h-10 rounded-[2px] border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-[#fb2576] hover:text-white hover:border-[#fb2576] transition-all">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

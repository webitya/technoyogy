'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

const FbSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IgSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const YtSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>;
const TgSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;

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

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative h-8 w-auto flex items-center gap-3 group">
            <img src="/technoyogylogo.png" alt="" className="h-full w-auto object-contain transition-transform group-hover:scale-105" />
            <span className={`text-xl font-bold tracking-tighter transition-colors group-hover:text-primary ${isOpen ? 'text-black' : isScrolled ? 'text-black' : 'text-black'}`}>
              Technoyogy<span className="text-primary">ai</span>
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
            {isOpen ? <X size={28} className="text-[#7a3983]" /> : <Menu size={28} />}
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
              {/* Close Button Inside Drawer */}
              <button 
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-50 text-[#7a3983] rounded-[2px] transition-all hover:bg-[#7a3983] hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>

              <div className="flex flex-col h-full">
                <div className="mb-12">
                   <h2 className="text-2xl font-bold tracking-tighter mb-1 uppercase">Technoyogy<span className="text-primary">ai</span></h2>
                   <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">TACTICAL INSIGHTS HUB</p>
                </div>

                <div className="flex flex-col gap-8 text-2xl font-bold uppercase tracking-tighter text-[#1a1a1a]">
                  <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors w-fit">Home</Link>
                  <Link href="/blogs" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors w-fit">Blogs</Link>
                  <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors w-fit">About</Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors w-fit">Contact</Link>
                </div>

                <div className="mt-auto">
                    <Link href="/admin" onClick={() => setIsOpen(false)} className="block w-full text-center py-4 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-[2px] shadow-xl shadow-primary/20 mb-8">
                       Authorized Sign In
                    </Link>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { href: SOCIAL_LINKS.facebook, label: 'Facebook', icon: <FbSVG /> },
                                { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: <IgSVG /> },
                                { href: SOCIAL_LINKS.youtube, label: 'YouTube', icon: <YtSVG /> },
                                { href: SOCIAL_LINKS.telegram, label: 'Telegram', icon: <TgSVG /> },
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" 
                                    className="flex items-center gap-2.5 p-3 rounded-[2px] border border-gray-50 flex-1 hover:border-[#7a3983] transition-all group">
                                    <div className="text-gray-400 group-hover:text-[#7a3983] transition-colors scale-75 origin-left">
                                        {social.icon}
                                    </div>
                                    <span className="text-[9px] font-bold text-[#1a1a1a] uppercase tracking-widest">
                                        {social.label}
                                    </span>
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

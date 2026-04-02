'use client';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

// SVG Icon components
const FbSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IgSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const YtSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>;
const PinSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>;
const TgSVG = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;

const Footer = () => {
  const socialIcons = [
    { href: SOCIAL_LINKS.facebook, icon: <FbSVG />, label: 'Facebook' },
    { href: SOCIAL_LINKS.instagram, icon: <IgSVG />, label: 'Instagram' },
    { href: SOCIAL_LINKS.youtube, icon: <YtSVG />, label: 'YouTube' },
    { href: SOCIAL_LINKS.pinterest, icon: <PinSVG />, label: 'Pinterest' },
    { href: SOCIAL_LINKS.telegram, icon: <TgSVG />, label: 'Telegram' },
  ];

  return (
    <footer className="pt-32 pb-16 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-20">

          {/* Brand & About */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="relative h-10 w-fit flex items-center">
              <img src="/technoyogylogo.png" alt="Technoyogyx" className="h-full w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed">
              Explore the latest in technology, lifestyle, and innovation. Stay ahead of the curve with expert insights from Yog Prakash Sah.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialIcons.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Useful Links</h3>
            <ul className="flex flex-col gap-4 text-white/60 text-lg">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Me</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Follow Us</h3>
            <ul className="flex flex-col gap-4 text-white/60 text-lg">
              <li>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-3">
                  <IgSVG /> Instagram
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-3">
                  <YtSVG /> YouTube
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-3">
                  <FbSVG /> Facebook
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-3">
                  <TgSVG /> Telegram
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-3">
                  <PinSVG /> Pinterest
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Contact Info</h3>
            <ul className="flex flex-col gap-6 text-white/60 text-lg">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Mail size={18} /></div>
                <span>contact@technoyogyx.com</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <TgSVG />
                </div>
                <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">t.me/technoyogy</a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><MapPin size={18} /></div>
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-white/40 text-sm">
          <p>© 2026 Technoyogyx. All rights reserved by Yog Prakash Sah.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

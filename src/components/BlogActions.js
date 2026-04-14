'use client';
import { useState, useEffect } from 'react';
import { Heart, Share2 } from 'lucide-react';

export default function BlogActions({ slug, initialLikes = 0, initialShares = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [shares, setShares] = useState(initialShares);
  const [hasLiked, setHasLiked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
      if (likedBlogs[slug]) {
        setHasLiked(true);
      }
    }
  }, [slug]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newHasLiked = !hasLiked;
    setHasLiked(newHasLiked);
    setLikes(prev => (newHasLiked ? prev + 1 : Math.max(0, prev - 1)));

    if (typeof window !== 'undefined') {
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
      if (newHasLiked) {
        likedBlogs[slug] = true;
      } else {
        delete likedBlogs[slug];
      }
      localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
    }

    try {
      const res = await fetch(`/api/blogs/${slug}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: newHasLiked ? 'like' : 'unlike' })
      });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
      }
    } catch(e) {
      console.error(e);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSharing) return;
    setIsSharing(true);

    try {
      const shareUrl = `${window.location.origin}/blog/${slug}`;
      if (navigator.share) {
        await navigator.share({
          title: 'Technoyogyai Blog',
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }

      const res = await fetch(`/api/blogs/${slug}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'share' })
      });
      if (res.ok) {
        const data = await res.json();
        setShares(data.shares);
      }
    } catch (e) {
      // User might cancel share
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <button 
        onClick={handleLike} 
        className={`flex items-center gap-1.5 transition-colors group ${hasLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
      >
        <Heart size={14} fill={hasLiked ? "currentColor" : "none"} className={`transition-transform duration-300 ${hasLiked ? 'scale-110' : ''}`} />
        <span className="text-[10px] font-bold uppercase tracking-widest">{likes} <span className="hidden sm:inline">Likes</span></span>
      </button>

      <button 
        onClick={handleShare} 
        className="flex items-center gap-1.5 text-gray-400 hover:text-[#7a3983] transition-colors group"
      >
        <Share2 size={14} className={`transition-transform duration-300 group-hover:scale-110 ${isSharing ? 'animate-pulse' : ''}`} />
        <span className="text-[10px] font-bold uppercase tracking-widest">{shares} <span className="hidden sm:inline">Shares</span></span>
      </button>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Heart, Share2, Loader2, Check } from 'lucide-react';

export default function BlogActions({ slug, initialLikes = 0, initialShares = 0 }) {
  const [likes, setLikes] = useState(Number(initialLikes || 0));
  const [shares, setShares] = useState(Number(initialShares || 0));
  const [hasLiked, setHasLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showCopied, setShowCopied] = useState(false);

  // Sync with localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
      if (likedBlogs[slug]) {
        setHasLiked(true);
      }
    }
    
    // Proper fetching: get latest stats on mount
    const fetchLatestStats = async () => {
      try {
        const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}/action`);
        if (res.ok) {
          const data = await res.json();
          setLikes(Number(data.likes || 0));
          setShares(Number(data.shares || 0));
        }
      } catch (err) {
        console.error('Failed to fetch latest stats:', err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchLatestStats();
  }, [slug]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLikeLoading || isInitialLoading) return;
    setIsLikeLoading(true);

    const newHasLiked = !hasLiked;
    const action = newHasLiked ? 'like' : 'unlike';

    // Optimistic UI
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
      const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (typeof data.likes === 'number') {
          setLikes(data.likes);
        }
      } else {
        // Rollback
        setHasLiked(!newHasLiked);
        setLikes(prev => (!newHasLiked ? prev + 1 : Math.max(0, prev - 1)));
      }
    } catch(err) {
      console.error('Like action failed:', err);
      setHasLiked(!newHasLiked);
      setLikes(prev => (!newHasLiked ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isShareLoading || isInitialLoading) return;
    setIsShareLoading(true);

    try {
      const shareUrl = `${window.location.origin}/blog/${slug}`;
      let shared = false;

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Technoyogyai Blog',
            url: shareUrl
          });
          shared = true;
        } catch (err) {
          if (err.name !== 'AbortError') console.error('Share failed:', err);
        }
      }
      
      if (!shared) {
        await navigator.clipboard.writeText(shareUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }

      const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'share' })
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.shares === 'number') {
          setShares(data.shares);
        }
      }
    } catch (e) {
      console.error('Share action failed:', e);
    } finally {
      setIsShareLoading(false);
    }
  };

  return (
    <div className={`flex gap-4 items-center transition-all duration-500 ${isInitialLoading ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}`}>
      <button 
        onClick={handleLike} 
        disabled={isInitialLoading}
        className={`flex items-center gap-2 px-2 py-1 rounded-full transition-all group relative active:scale-95 ${hasLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50/50'}`}
        aria-label={hasLiked ? "Unlike post" : "Like post"}
      >
        <div className="relative">
          <Heart 
            size={16} 
            fill={hasLiked ? "currentColor" : "none"} 
            className={`transition-transform duration-300 ${hasLiked ? 'scale-110' : 'group-hover:scale-110'} ${isLikeLoading ? 'opacity-0' : 'opacity-100'}`} 
          />
          {isLikeLoading && (
            <Loader2 size={12} className="absolute inset-0 m-auto animate-spin text-red-500" />
          )}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest tabular-nums">
          {likes}
        </span>
      </button>

      <button 
        onClick={handleShare} 
        disabled={isInitialLoading}
        className={`flex items-center gap-2 px-2 py-1 rounded-full transition-all group relative active:scale-95 ${showCopied ? 'text-[#7a3983] bg-[#7a3983]/10' : 'text-gray-400 hover:text-[#7a3983] hover:bg-[#7a3983]/5'}`}
        aria-label="Share post"
      >
        <div className="relative">
          {showCopied ? (
            <Check size={16} className="text-[#7a3983] animate-in zoom-in duration-300" />
          ) : (
            <Share2 
              size={16} 
              className={`transition-transform duration-300 group-hover:scale-110 ${isShareLoading ? 'opacity-0' : 'opacity-100'}`} 
            />
          )}
          {isShareLoading && !showCopied && (
            <Loader2 size={12} className="absolute inset-0 m-auto animate-spin text-[#7a3983]" />
          )}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest tabular-nums">
          {showCopied ? 'COPIED' : shares}
        </span>
      </button>
    </div>
  );
}



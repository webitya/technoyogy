'use client';
import { useState, useEffect, useRef } from 'react';
import { Radio } from 'lucide-react'; // Pulsing 'live' icon

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double execution in strict mode during dev
    if (fetchedRef.current) return;
    
    const trackVisitor = async () => {
      // Check if we already incremented the counter in this session
      const hasVisited = sessionStorage.getItem('hasVisited');

      try {
        if (!hasVisited) {
          const res = await fetch('/api/visitors', { method: 'POST' });
          if (res.ok) {
            const data = await res.json();
            setVisitorCount(data.count);
            sessionStorage.setItem('hasVisited', 'true');
          }
        } else {
          // If already visited, just get the current count
          const res = await fetch('/api/visitors');
          if (res.ok) {
            const data = await res.json();
            setVisitorCount(data.count);
          }
        }
      } catch (error) {
        console.error('Visitor system offline:', error);
      } finally {
        fetchedRef.current = true;
      }
    };

    trackVisitor();
  }, []);

  if (visitorCount === 0) return null;

  return (
    <div className="flex items-center gap-2 group cursor-default">
      <div className="flex items-center gap-2 text-white/40 border border-white/5 px-2 py-1 rounded-[2px] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500">
        <div className="relative flex items-center justify-center">
           <Radio size={10} className="text-[#7a3983] animate-pulse" />
           <div className="absolute inset-0 bg-[#7a3983]/20 rounded-full animate-ping scale-150"></div>
        </div>
        <span className="text-[9px] font-black tracking-[4px] uppercase flex items-center gap-2">
          Visitor <span className="text-white font-black tabular-nums">{visitorCount.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
}


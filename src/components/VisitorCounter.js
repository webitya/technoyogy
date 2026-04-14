'use client';
import { useState, useEffect } from 'react';
import { Target } from 'lucide-react'; // Some industrial/tactical icon

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      // Check if we already incremented the counter in this session
      const hasVisited = sessionStorage.getItem('hasVisited');

      if (!hasVisited) {
        try {
          const res = await fetch('/api/visitors', { method: 'POST' });
          if (res.ok) {
            const data = await res.json();
            setVisitorCount(data.count);
            sessionStorage.setItem('hasVisited', 'true');
          }
        } catch (error) {
          console.error('Error tracking visitor', error);
        }
      } else {
        // If already visited, just get the current count
        try {
          const res = await fetch('/api/visitors');
          if (res.ok) {
            const data = await res.json();
            setVisitorCount(data.count);
          }
        } catch (error) {
          console.error('Error fetching visitor count', error);
        }
      }
    };

    trackVisitor();
  }, []);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2 text-white/50 border border-white/10 px-3 py-1.5 rounded-[2px] bg-white/[0.02]">
        <Target size={12} className="text-[#7a3983]" />
        <span className="text-[10px] font-bold tracking-[3px] uppercase">
          Visitor Counter: <span className="text-white ml-1">{visitorCount.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
}

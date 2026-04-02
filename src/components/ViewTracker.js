'use client';
import { useEffect } from 'react';

export default function ViewTracker({ slug }) {
  useEffect(() => {
    // Only track if not in development if you wanted, but for now we'll just track
    fetch(`/api/blogs/${slug}/view`, { method: 'POST' }).catch(err => console.error(err));
  }, [slug]);

  return null;
}

'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-8 py-3 rounded-full border-2 border-foreground/10 hover:border-primary hover:text-primary transition-all font-bold"
    >
      Sign Out
    </button>
  );
}

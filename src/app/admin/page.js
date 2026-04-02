'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <Navbar />
      <section className="pt-40 pb-24 flex items-center justify-center">
        <div className="w-full max-w-md p-10 glass rounded-[40px] shadow-2xl border border-foreground/10">
          <div className="flex flex-col gap-4 text-center mb-10">
            <h1 className="text-4xl font-black heading-gradient">Admin Portal</h1>
            <p className="text-foreground/60 font-medium">Please sign in to manage your blogs.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && <p className="text-primary text-sm font-bold bg-primary/10 p-3 rounded-xl text-center">{error}</p>}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-foreground/40 ml-2">Username</label>
              <input
                type="text"
                className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black border border-foreground/10 outline-none focus:border-primary transition-colors font-medium shadow-sm"
                placeholder="Manager ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-foreground/40 ml-2">Password</label>
              <input
                type="password"
                className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black border border-foreground/10 outline-none focus:border-primary transition-colors font-medium shadow-sm"
                placeholder="Access Secret"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full mt-6 py-5 rounded-[20px] text-lg font-bold"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}

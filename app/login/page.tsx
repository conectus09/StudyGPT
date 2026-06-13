'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('harsh@example.com');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 650));

    // Demo login - accept any non-empty credentials
    const name = email.split('@')[0].split(/[._-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    // Save user in localStorage (simulates auth)
    localStorage.setItem('grok_user', JSON.stringify({
      id: Date.now().toString(),
      name: name || 'User',
      email,
    }));
    localStorage.setItem('grok_logged_in', 'true');

    toast.success("Welcome back!");

    router.push('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      <div className="w-full max-w-[380px]">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center">
              <span className="text-[#0a0a0a] font-black text-[29px] leading-none mt-[-2px]">G</span>
            </div>
            <span className="font-semibold text-3xl tracking-tighter">Grok</span>
          </Link>
        </div>

        <div className="glass rounded-3xl p-8 border border-zinc-800">
          <div className="text-center mb-7">
            <h1 className="text-3xl font-semibold tracking-tighter">Welcome back</h1>
            <p className="text-zinc-400 mt-1.5 text-sm">Sign in to continue to Grok</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full py-3 text-base" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Log in"}
            </Button>
          </form>

          <div className="flex justify-between text-sm mt-5 text-zinc-400">
            <button onClick={() => toast.info("Demo only — reset would be sent here")} className="hover:text-zinc-300">
              Forgot password?
            </button>
            <Link href="/signup" className="hover:text-white">
              Create account
            </Link>
          </div>
        </div>

        <p className="text-center text-[10px] text-zinc-500 mt-8 tracking-widest">SECURE • PRIVATE • POWERED BY xAI</p>
      </div>
    </div>
  );
}

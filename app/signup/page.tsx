'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 700));

    // Create user
    const user = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem('grok_user', JSON.stringify(user));
    localStorage.setItem('grok_logged_in', 'true');

    toast.success(`Welcome, ${user.name.split(' ')[0]}!`);

    router.push('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      <div className="w-full max-w-[400px]">
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
            <h1 className="text-3xl font-semibold tracking-tighter">Create your account</h1>
            <p className="text-zinc-400 mt-1.5 text-sm">Join Grok and start exploring</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full py-3 text-base" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-400 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:underline">Log in</Link>
          </p>
        </div>

        <p className="text-center text-[10px] text-zinc-500 mt-8">Your data is private. We never train on your chats.</p>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-[#0a0a0a]/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-2xl bg-white flex items-center justify-center">
            <span className="text-[#0a0a0a] font-black text-2xl leading-none mt-[-1px]">G</span>
          </div>
          <span className="font-semibold text-2xl tracking-tighter">Grok</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="pt-20 pb-24 text-center px-6">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400 mb-6">
          Powered by advanced AI models
        </div>

        <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
          The most advanced AI.<br />Now in your hands.
        </h1>

        <p className="max-w-md mx-auto text-xl text-zinc-400 mb-10">
          Meet Grok — helpful, truthful, and a little bit witty. 
          The best way to get things done with AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="group px-8">
              Get started for free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="px-8">
              Log in
            </Button>
          </Link>
        </div>

        <p className="text-xs text-zinc-500 mt-5">No credit card required • Works instantly</p>
      </div>
    </div>
  );
}

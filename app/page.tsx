import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <Hero />

      <Features />

      {/* Final CTA */}
      <div className="border-t border-zinc-800 py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-4xl font-semibold tracking-tighter mb-4">Ready to experience the future of AI?</h2>
          <p className="text-zinc-400 mb-8">Join thousands using Grok every day to think better, create faster, and learn more.</p>
          
          <Link href="/signup">
            <Button size="lg" className="px-10">Start chatting for free</Button>
          </Link>
        </div>
      </div>

      <footer className="text-center text-xs text-zinc-500 py-8 border-t border-zinc-800">
        Built as a beautiful modern demo • Grok by xAI
      </footer>
    </div>
  );
}

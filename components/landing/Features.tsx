'use client';

import { Brain, Zap, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Advanced Reasoning",
    desc: "Understands complex questions and provides thoughtful, accurate answers.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Real-time responses powered by state-of-the-art models.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    desc: "Your conversations stay private. We never train on your data.",
  },
  {
    icon: Sparkles,
    title: "Helpful & Witty",
    desc: "More than just answers — get creative ideas, code, and clear explanations.",
  },
];

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold tracking-tight">Everything you need to be more productive</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="rounded-3xl border border-zinc-800 p-6 bg-zinc-950/50 hover:border-zinc-700 transition">
            <feature.icon className="h-8 w-8 text-indigo-400 mb-4" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-zinc-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

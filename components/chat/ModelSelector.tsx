'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Model } from '@/types';

interface ModelSelectorProps {
  currentModel: Model;
  onModelChange: (model: Model) => void;
}

const models: { value: Model; label: string }[] = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
  { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'grok-4', label: 'Grok 4' },
];

export default function ModelSelector({ currentModel, onModelChange }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const current = models.find(m => m.value === currentModel) || models[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm hover:bg-zinc-900 transition"
      >
        {current.label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl py-1 z-50 text-sm">
          {models.map((model) => (
            <button
              key={model.value}
              onClick={() => {
                onModelChange(model.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 hover:bg-zinc-900 flex items-center justify-between ${currentModel === model.value ? 'text-white' : 'text-zinc-300'}`}
            >
              {model.label}
              {currentModel === model.value && <span className="text-indigo-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Plus } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  return (
    <div className="border-t border-zinc-800 bg-[#0a0a0a] p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 bg-zinc-900 border border-zinc-700 rounded-3xl px-2 py-1.5">
          <button 
            onClick={() => alert("Attachments coming soon in Pro!")} 
            className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-2xl transition"
          >
            <Plus className="h-5 w-5" />
          </button>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Message Grok..."
            rows={1}
            className="flex-1 bg-transparent resize-none px-2 py-2 text-[15px] placeholder:text-zinc-500 focus:outline-none max-h-[160px]"
            disabled={disabled}
          />

          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className="p-2.5 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center mb-0.5"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="text-[10px] text-center text-zinc-500 mt-2 hidden md:block">
          Grok can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
}

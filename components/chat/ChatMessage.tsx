'use client';

import { Message } from '@/types';
import { Copy } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onCopy?: (content: string) => void;
}

export default function ChatMessage({ message, onCopy }: ChatMessageProps) {
  const isUser = message.role === 'user';

  const handleCopy = () => {
    if (onCopy) onCopy(message.content);
    else navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`max-w-[78%] md:max-w-[65%] rounded-3xl px-4 py-3 text-[15px] leading-relaxed relative ${isUser 
        ? 'bg-zinc-800 text-white rounded-br-md' 
        : 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-bl-md'
      }`}>
        <div className="whitespace-pre-wrap">{message.content}</div>

        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white p-1.5 rounded-full border border-zinc-700"
            title="Copy"
          >
            <Copy className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}

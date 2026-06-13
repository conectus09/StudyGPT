'use client';

import { Chat } from '@/types';
import { Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
}

export default function ChatSidebar({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}: ChatSidebarProps) {
  const [search, setSearch] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 flex-shrink-0 border-r border-zinc-800 bg-[#0a0a0a] flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 py-2.5 text-sm hover:bg-zinc-900 transition font-medium"
        >
          <Plus className="h-4 w-4" /> New chat
        </button>

        <div className="mt-3 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 pl-9 py-2 rounded-2xl text-sm focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredChats.length === 0 && (
          <div className="text-center text-xs text-zinc-500 pt-8">No chats found</div>
        )}

        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`group flex items-center justify-between rounded-2xl px-3 py-2.5 cursor-pointer text-sm transition ${currentChatId === chat.id ? 'bg-zinc-800' : 'hover:bg-zinc-900'}`}
          >
            <div className="flex-1 min-w-0 pr-2">
              <div className="font-medium truncate">{chat.title}</div>
              {chat.messages.length > 0 && (
                <div className="text-xs text-zinc-500 truncate mt-0.5">
                  {chat.messages[chat.messages.length - 1].content.slice(0, 50)}
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 text-[10px] text-center text-zinc-500 border-t border-zinc-800">
        Chats saved locally
      </div>
    </div>
  );
}

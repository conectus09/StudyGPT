'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Chat, Message, Model, User } from '@/types';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import ModelSelector from '@/components/chat/ModelSelector';
import { LogOut, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [currentModel, setCurrentModel] = useState<Model>('gpt-4o-mini');
  const [isSending, setIsSending] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile
  const router = useRouter();

  const currentChat = chats.find(c => c.id === currentChatId);

  // Auth guard + load data
  useEffect(() => {
    const loggedIn = localStorage.getItem('grok_logged_in');
    const savedUser = localStorage.getItem('grok_user');

    if (!loggedIn || !savedUser) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } catch {
      router.push('/login');
      return;
    }

    // Load chats from localStorage
    const savedChats = localStorage.getItem('grok_chats');
    let loadedChats: Chat[] = [];

    if (savedChats) {
      loadedChats = JSON.parse(savedChats);
    } else {
      // Seed demo chats
      loadedChats = seedDemoChats();
      localStorage.setItem('grok_chats', JSON.stringify(loadedChats));
    }

    setChats(loadedChats);

    // Select most recent chat
    if (loadedChats.length > 0) {
      setCurrentChatId(loadedChats[0].id);
    } else {
      createNewChat(loadedChats);
    }
  }, [router]);

  function seedDemoChats(): Chat[] {
    const now = Date.now();
    return [
      {
        id: (now - 8000000).toString(),
        title: "Best ways to learn Rust in 2025",
        messages: [
          { id: 'm1', role: 'user', content: 'Best ways to learn Rust in 2025' },
          { id: 'm2', role: 'assistant', content: 'Rust rewards patience. Start with The Book, then immediately build a small CLI tool. The official Rustlings exercises are excellent.' },
        ],
        model: 'grok-4',
        createdAt: new Date(now - 8000000).toISOString(),
      },
      {
        id: (now - 4000000).toString(),
        title: "Plan a 2 week trip to Japan",
        messages: [
          { id: 'm3', role: 'user', content: 'Help me plan a 2 week trip to Japan' },
          { id: 'm4', role: 'assistant', content: 'Classic and highly recommended route: 6 days Tokyo → 5 days Kyoto → 3 days Osaka. Prioritize amazing food experiences.' },
        ],
        model: 'gpt-4o',
        createdAt: new Date(now - 4000000).toISOString(),
      },
    ];
  }

  function saveChats(updatedChats: Chat[]) {
    setChats(updatedChats);
    localStorage.setItem('grok_chats', JSON.stringify(updatedChats));
  }

  function createNewChat(existingChats = chats) {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New chat',
      messages: [],
      model: currentModel,
      createdAt: new Date().toISOString(),
    };

    const updated = [newChat, ...existingChats];
    saveChats(updated);
    setCurrentChatId(newChat.id);
    return newChat;
  }

  function handleNewChat() {
    createNewChat();
  }

  function handleSelectChat(id: string) {
    setCurrentChatId(id);
    setIsSidebarOpen(false); // close on mobile
  }

  function handleDeleteChat(id: string) {
    const updated = chats.filter(c => c.id !== id);
    saveChats(updated);

    if (currentChatId === id) {
      if (updated.length > 0) {
        setCurrentChatId(updated[0].id);
      } else {
        createNewChat(updated);
      }
    }
    toast.success("Chat deleted");
  }

  function handleModelChange(model: Model) {
    setCurrentModel(model);

    // Optionally update current chat's model
    if (currentChat) {
      const updated = chats.map(c =>
        c.id === currentChatId ? { ...c, model } : c
      );
      saveChats(updated);
    }
  }

  // Core send function — calls our API
  async function handleSendMessage(content: string) {
    if (!currentChatId || isSending) return;

    let chatIndex = chats.findIndex(c => c.id === currentChatId);
    if (chatIndex === -1) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    // Update chat with user message
    const updatedChats = [...chats];
    updatedChats[chatIndex] = {
      ...updatedChats[chatIndex],
      messages: [...updatedChats[chatIndex].messages, userMessage],
    };

    // Auto set title from first message
    if (updatedChats[chatIndex].title === 'New chat') {
      updatedChats[chatIndex].title = content.length > 42 ? content.slice(0, 39) + '...' : content;
    }

    saveChats(updatedChats);
    setIsSending(true);

    try {
      // Call our secure backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedChats[chatIndex].messages,
          model: updatedChats[chatIndex].model || currentModel,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toISOString(),
      };

      // Add AI message
      const finalChats = [...updatedChats];
      finalChats[chatIndex] = {
        ...finalChats[chatIndex],
        messages: [...finalChats[chatIndex].messages, assistantMessage],
      };

      saveChats(finalChats);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get a response. Using fallback.");

      // Fallback witty reply
      const fallback: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I had a brief hiccup. But I'm still here — what else can I help with?",
      };

      const finalChats = [...updatedChats];
      finalChats[chatIndex] = {
        ...finalChats[chatIndex],
        messages: [...finalChats[chatIndex].messages, fallback],
      };
      saveChats(finalChats);
    } finally {
      setIsSending(false);
    }
  }

  function handleCopyMessage(content: string) {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  }

  function handleLogout() {
    localStorage.removeItem('grok_logged_in');
    localStorage.removeItem('grok_user');
    // keep chats
    router.push('/login');
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block fixed md:static inset-0 z-40 md:z-auto`}>
        <ChatSidebar
          chats={chats}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Navbar */}
        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 z-30 bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="md:hidden p-2 text-zinc-400"
            >
              ☰
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center">
                <span className="text-[#0a0a0a] font-black text-lg leading-none mt-[-1px]">G</span>
              </div>
              <span className="font-semibold tracking-tighter text-lg">Grok</span>
            </div>

            <div className="ml-4 hidden md:block">
              <ModelSelector 
                currentModel={currentModel} 
                onModelChange={handleModelChange} 
              />
            </div>
          </div>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-xs font-bold">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <span className="font-medium">{user.name}</span>
            </div>

            <button 
              onClick={handleLogout} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm hover:bg-zinc-900 transition border border-zinc-800"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto chat-container px-4 md:px-6 pt-8 pb-4 max-w-3xl mx-auto w-full space-y-6">
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center mb-6">
                <span className="text-[#0a0a0a] font-black text-[52px] leading-none mt-[-4px]">G</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tighter">How can I help you today?</h2>
              <p className="text-zinc-400 mt-2 max-w-xs">Ask me anything — code, ideas, explanations, or just chat.</p>
            </div>
          ) : (
            currentChat.messages.map((msg) => (
              <ChatMessage 
                key={msg.id} 
                message={msg} 
                onCopy={handleCopyMessage} 
              />
            ))
          )}

          {/* Typing indicator */}
          {isSending && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold mt-1">G</div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl rounded-bl-md px-4 py-3">
                <div className="typing-indicator flex gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput onSend={handleSendMessage} disabled={isSending} />
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="md:hidden fixed inset-0 bg-black/60 z-30" 
        />
      )}
    </div>
  );
}

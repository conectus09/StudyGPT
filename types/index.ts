export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: string;
  updatedAt?: string;
}

export type Model = 
  | 'gpt-4o' 
  | 'gpt-4o-mini' 
  | 'claude-3-5-sonnet' 
  | 'grok-4';

export interface User {
  id: string;
  name: string;
  email: string;
}
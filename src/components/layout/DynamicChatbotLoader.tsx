
"use client";

import dynamic from 'next/dynamic';

// Dynamically import ChatbotDialog here with ssr: false
const ChatbotDialog = dynamic(() =>
  import('@/components/chatbot/ChatbotDialog').then(mod => mod.ChatbotDialog),
  { ssr: false }
);

export function DynamicChatbotLoader() {
  return <ChatbotDialog />;
}

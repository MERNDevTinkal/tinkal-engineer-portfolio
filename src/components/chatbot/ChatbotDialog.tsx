
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { getPortfolioChatResponse, type PortfolioChatInput, type PortfolioChatOutput } from "@/ai/flows/portfolio-chat-flow";
import { AUTHOR_NAME } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  isLoading?: boolean;
}

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: "initial-bot-message",
          sender: "bot",
          text: `Hello! I'm ${AUTHOR_NAME}'s AI assistant. How can I help you learn more about ${AUTHOR_NAME}?`,
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setMessages([]); // Clear messages when closed
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = currentInput.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString() + "-user",
      sender: "user",
      text: trimmedInput,
    };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput("");
    setIsLoading(true);

    // Add a temporary loading message for the bot
    const loadingBotMessageId = Date.now().toString() + "-bot-loading";
    setMessages((prev) => [...prev, { id: loadingBotMessageId, sender: 'bot', text: '...', isLoading: true }]);
    
    try {
      const chatInput: PortfolioChatInput = { userInput: trimmedInput };
      const result: PortfolioChatOutput = await getPortfolioChatResponse(chatInput);
      
      setMessages((prevMessages) => 
        prevMessages.map(msg => 
          msg.id === loadingBotMessageId 
          ? { ...msg, text: result.response, isLoading: false } 
          : msg
        )
      );

    } catch (error) {
      console.error("Chatbot error:", error);
       setMessages((prevMessages) => 
        prevMessages.map(msg => 
          msg.id === loadingBotMessageId 
          ? { ...msg, text: "Sorry, I encountered an error. Please try again.", isLoading: false } 
          : msg
        )
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };
  
  const chatWindowVariants = {
    closed: { opacity: 0, y: 50, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1 }
  };

  const triggerButtonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { delay: 1, type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <>
      <motion.div
        variants={triggerButtonVariants}
        initial="initial"
        animate="animate"
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg hover:scale-110 transition-transform bg-primary hover:bg-primary/90"
          aria-label="Toggle Chatbot"
        >
          {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatWindowVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-sm rounded-xl bg-background shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ height: 'min(70vh, 600px)'}} // Responsive height
          >
            <header className="bg-card p-4 border-b border-border">
              <h3 className="font-semibold text-lg text-primary font-headline">Chat with {AUTHOR_NAME}'s Assistant</h3>
            </header>

            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} isLoading={msg.isLoading} />
              ))}
            </ScrollArea>

            <footer className="p-4 border-t border-border bg-card">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about Tinkal..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-grow"
                />
                <Button type="submit" size="icon" disabled={isLoading || !currentInput.trim()}>
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


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

const INITIAL_SUGGESTIONS = [
  "What are Tinkal's key skills?",
  "Tell me about a project Tinkal worked on.",
  "What is Tinkal's work experience?",
  "How can I contact Tinkal?",
  "What certifications does Tinkal hold?",
];

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: "initial-bot-message",
          sender: "bot",
          text: `Hello! I'm ${AUTHOR_NAME}'s AI assistant. Ask me about skills, projects, experience, or how to get in touch! You can also use the suggestions below.`,
        },
      ]);
      setCurrentSuggestions(INITIAL_SUGGESTIONS);
      setShowSuggestions(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setMessages([]); 
      setShowSuggestions(false);
    }
  }, [isOpen]); // Removed AUTHOR_NAME from dependency array as it's a constant

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const processMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setShowSuggestions(false); // Hide suggestions when a message is sent

    const userMessage: Message = {
      id: `${Date.now()}-user-${Math.random().toString(36).substring(7)}`,
      sender: "user",
      text: messageText.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsLoading(true);
    const loadingBotMessageId = `${Date.now()}-bot-loading-${Math.random().toString(36).substring(7)}`;
    setMessages((prev) => [...prev, { id: loadingBotMessageId, sender: 'bot', text: '...', isLoading: true }]);
    
    try {
      const chatInput: PortfolioChatInput = { userInput: messageText.trim() };
      const result: PortfolioChatOutput = await getPortfolioChatResponse(chatInput);
      
      setMessages((prevMessages) => 
        prevMessages.map(msg => 
          msg.id === loadingBotMessageId 
          ? { ...msg, text: result.response, isLoading: false } 
          : msg
        )
      );

      if (result.suggestedFollowUps && result.suggestedFollowUps.length > 0) {
        setCurrentSuggestions(result.suggestedFollowUps);
      } else {
        // Fallback to initial suggestions if AI doesn't provide any
        setCurrentSuggestions(INITIAL_SUGGESTIONS); 
      }

    } catch (error) {
      console.error("Chatbot error:", error);
       setMessages((prevMessages) => 
        prevMessages.map(msg => 
          msg.id === loadingBotMessageId 
          ? { ...msg, text: "Sorry, I encountered an issue. Please try asking in a different way or check back later.", isLoading: false } 
          : msg
        )
      );
      setCurrentSuggestions(INITIAL_SUGGESTIONS); // Fallback suggestions on error
    } finally {
      setIsLoading(false);
      setShowSuggestions(true); // Show suggestions again (new or fallback)
      inputRef.current?.focus();
    }
  };

  const handleSendCurrentInput = () => {
    processMessage(currentInput);
    setCurrentInput(""); 
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentInput(""); // Clear input before processing suggestion
    processMessage(suggestion);
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
            style={{ height: 'min(70vh, 600px)'}} // Set max height for the chat window
          >
            <header className="bg-card p-4 border-b border-border">
              <h3 className="font-semibold text-lg text-primary font-headline">Chat with {AUTHOR_NAME}'s Assistant</h3>
            </header>

            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} isLoading={msg.isLoading} />
              ))}
            </ScrollArea>
            
            {/* Suggestions Area - Moved here */}
            {showSuggestions && currentSuggestions.length > 0 && (
                <div className="p-3 border-t border-border bg-card/80"> {/* Use bg-card or similar for distinction */}
                    <p className="text-xs text-muted-foreground mb-2 px-1">Suggestions:</p>
                    <div className="flex flex-wrap gap-2 px-1">
                        {currentSuggestions.map((q, index) => (
                            <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-auto py-1.5 px-3 rounded-full bg-background hover:bg-muted shadow-sm" // Ensure background helps it stand out
                            onClick={() => handleSuggestionClick(q)}
                            disabled={isLoading}
                            >
                            {q}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            <footer className="p-4 border-t border-border bg-card"> {/* Ensure footer is distinct */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendCurrentInput();
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

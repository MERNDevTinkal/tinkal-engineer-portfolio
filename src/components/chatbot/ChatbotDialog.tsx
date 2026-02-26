
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, X, MessageSquarePlus, ChevronDown, ChevronUp, Trash2, Copy, CheckCircle2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { getPortfolioChatResponse } from "@/ai/flows/portfolio-chat-flow";
import type { PortfolioChatOutput } from "@/ai/flows/portfolio-chat-types";
import { AUTHOR_NAME, SORA_AVATAR_URL } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  isLoading?: boolean;
  suggestions?: string[];
}

const INITIAL_SUGGESTIONS = [
  `What are ${AUTHOR_NAME}'s key skills?`,
  `Tell me about a project ${AUTHOR_NAME} worked on.`,
  `What is ${AUTHOR_NAME}'s work experience?`,
  `How can I contact ${AUTHOR_NAME}?`,
  `What certifications does ${AUTHOR_NAME} hold?`,
  `Describe ${AUTHOR_NAME}'s education.`,
  `What is ${AUTHOR_NAME} passionate about?`,
  `Is ${AUTHOR_NAME} open to relocation?`,
];

const LOCAL_STORAGE_KEY = 'portfolioChatHistory_Sora_v3'; 

const initialBotMessage: Message = {
  id: "initial-bot-message-sora",
  sender: "bot",
  text: `Hello! I'm Sora, Tinkal's personal AI assistant. Ask me about his skills, projects, experience, or how to get in touch! You can also use the suggestions.`,
  suggestions: INITIAL_SUGGESTIONS.slice(0, 4),
};

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [suggestionsExpanded, setSuggestionsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null); 

  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined') {
        try {
          const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages);
            if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
              setMessages(parsedMessages);
              const lastBotMessage = parsedMessages.filter(m => m.sender === 'bot' && !m.isLoading).pop();
              if (lastBotMessage && lastBotMessage.suggestions && lastBotMessage.suggestions.length > 0) {
                 setCurrentSuggestions(lastBotMessage.suggestions);
              } else {
                setCurrentSuggestions(INITIAL_SUGGESTIONS.slice(0,4));
              }
            } else {
              setMessages([initialBotMessage]);
              setCurrentSuggestions(initialBotMessage.suggestions || INITIAL_SUGGESTIONS.slice(0, 4));
            }
          } else {
            setMessages([initialBotMessage]);
            setCurrentSuggestions(initialBotMessage.suggestions || INITIAL_SUGGESTIONS.slice(0, 4));
          }
        } catch (error) {
          setMessages([initialBotMessage]);
          setCurrentSuggestions(initialBotMessage.suggestions || INITIAL_SUGGESTIONS.slice(0, 4));
        }
      }
      setSuggestionsExpanded(false); 
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && messages.length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        // console.error("Failed to save chat history to localStorage:", error);
      }
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [messages]);


  const processMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setSuggestionsExpanded(false);

    const userMessage: Message = {
      id: `${Date.now()}-user-${Math.random().toString(36).substring(7)}`,
      sender: "user",
      text: messageText.trim(),
    };
    
    const newMessagesBeforeBot = [...messages, userMessage];
    setMessages(newMessagesBeforeBot);

    const history = newMessagesBeforeBot.map(m => ({
      role: m.sender === 'bot' ? 'assistant' : 'user',
      content: m.text
    }));

    setIsLoading(true);
    const loadingBotMessageId = `${Date.now()}-bot-loading-${Math.random().toString(36).substring(7)}`;
    
    setMessages(prev => [...prev, { id: loadingBotMessageId, sender: 'bot', text: '...', isLoading: true }]);

    try {
      const result: PortfolioChatOutput = await getPortfolioChatResponse({ 
        userInput: messageText.trim(),
        history: history.slice(-10)
      });
      
      const validSuggestions = (result.suggestedFollowUps || [])
        .filter(s => s && s.trim() !== "")
        .slice(0, 4);

      const botMessage: Message = {
        id: loadingBotMessageId,
        sender: 'bot',
        text: result.response,
        isLoading: false,
        suggestions: validSuggestions.length > 0 ? validSuggestions : INITIAL_SUGGESTIONS.slice(0,4) 
      };

      setMessages((prevMessages) =>
        prevMessages.map(msg => msg.id === loadingBotMessageId ? botMessage : msg)
      );
      
      if (validSuggestions.length > 0) {
        setCurrentSuggestions(validSuggestions);
      } else {
        setCurrentSuggestions(INITIAL_SUGGESTIONS.slice(0, 4));
      }

    } catch (error) {
       const errorBotMessage: Message = {
        id: loadingBotMessageId,
        sender: 'bot',
        text: "I'm having a brief connection issue. Please try again in a moment!",
        isLoading: false,
        suggestions: INITIAL_SUGGESTIONS.slice(0,4)
      };
      setMessages((prevMessages) =>
        prevMessages.map(msg => msg.id === loadingBotMessageId ? errorBotMessage : msg)
      );
      setCurrentSuggestions(INITIAL_SUGGESTIONS.slice(0, 4));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSendCurrentInput = () => {
    processMessage(currentInput);
    setCurrentInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentInput(""); 
    processMessage(suggestion);
  };

  const handleClearChat = () => {
    setMessages([initialBotMessage]);
    setCurrentSuggestions(INITIAL_SUGGESTIONS.slice(0,4));
    setSuggestionsExpanded(false);
    setCurrentInput("");
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (error) {
        // console.error("Failed to clear chat history from localStorage:", error);
      }
    }
    toast({
      title: "Chat Cleared",
      description: "Memory has been reset.",
    });
    inputRef.current?.focus();
  };

  const handleCopyChat = () => {
    const chatText = messages
      .filter(m => !m.isLoading)
      .map(m => `${m.sender.toUpperCase()}: ${m.text}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(chatText).then(() => {
      setCopied(true);
      toast({ title: "Copied!" });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const chatWindowVariants = {
    closed: { opacity: 0, y: 50, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1 }
  };

  const gridTemplateRows = currentSuggestions.length > 0 ? "auto auto 1fr auto" : "auto 1fr auto";

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg hover:scale-110 transition-transform bg-primary hover:bg-primary/90 p-0 overflow-hidden"
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Avatar className="h-full w-full border-2 border-primary/20">
              <AvatarImage 
                src={SORA_AVATAR_URL} 
                alt="Sora"
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-7 w-7" />
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatWindowVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={cn(
              "fixed bottom-24 z-40 rounded-xl bg-background shadow-2xl border border-border overflow-hidden grid",
              "left-4 right-4 w-auto", 
              "md:left-auto md:right-6 md:w-full md:max-w-md", 
              "lg:max-w-lg"
            )}
            style={{ 
              maxHeight: 'min(calc(100vh - 12rem), 85vh)',
              gridTemplateRows: gridTemplateRows 
            }} 
          >
            <header className="bg-card p-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Avatar className="h-8 w-8 border border-primary/50 overflow-hidden">
                  <AvatarImage 
                    src={SORA_AVATAR_URL} 
                    alt="Sora AI Assistant"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-[10px]">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg text-primary font-headline">Sora Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={handleCopyChat} className="h-8 w-8">
                  {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={handleClearChat} className="h-8 w-8 hover:text-destructive">
                  <Trash2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </header>

            {currentSuggestions.length > 0 && (
              <div className="p-3 border-b border-border bg-card/50">
                {!suggestionsExpanded ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-primary py-2"
                    onClick={() => setSuggestionsExpanded(true)}
                    disabled={isLoading}
                  >
                    <MessageSquarePlus className="h-4 w-4 mr-2" />
                    View Suggestions
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-muted-foreground mb-2 py-2"
                      onClick={() => setSuggestionsExpanded(false)}
                    >
                      <MessageSquarePlus className="h-4 w-4 mr-2" />
                      Hide Suggestions
                      <ChevronUp className="h-4 w-4 ml-auto" />
                    </Button>
                    <div className="flex flex-wrap gap-2">
                      {currentSuggestions.map((q, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-full bg-card"
                          onClick={() => handleSuggestionClick(q)}
                          disabled={isLoading}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <ScrollArea ref={scrollAreaRef} className="p-4 min-h-0">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} isLoading={msg.isLoading} />
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <footer className="p-3 border-t border-border bg-card">
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
                  placeholder="Ask Sora anything..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-grow h-10"
                />
                <Button type="submit" size="icon" disabled={isLoading || !currentInput.trim()} className="h-10 w-10">
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

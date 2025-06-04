
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, X, MessageSquarePlus, ChevronDown, ChevronUp, Trash2, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { getPortfolioChatResponse, type PortfolioChatInput, type PortfolioChatOutput } from "@/ai/flows/portfolio-chat-flow";
import { AUTHOR_NAME } from "@/lib/data";
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

const LOCAL_STORAGE_KEY = 'portfolioChatHistory_Sora_v2'; 

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
      // Load messages from localStorage only on client-side
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
              } else if (parsedMessages.length === 1 && parsedMessages[0].id === initialBotMessage.id) {
                 setCurrentSuggestions(initialBotMessage.suggestions || INITIAL_SUGGESTIONS.slice(0, 4));
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
          // console.error("Failed to load chat history from localStorage:", error);
          setMessages([initialBotMessage]);
          setCurrentSuggestions(initialBotMessage.suggestions || INITIAL_SUGGESTIONS.slice(0, 4));
        }
      }
      setSuggestionsExpanded(false); 
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    // Save messages to localStorage only on client-side
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


    setIsLoading(true);
    const loadingBotMessageId = `${Date.now()}-bot-loading-${Math.random().toString(36).substring(7)}`;
    
    setMessages(prev => [...prev, { id: loadingBotMessageId, sender: 'bot', text: '...', isLoading: true }]);

    try {
      const chatInput: PortfolioChatInput = { userInput: messageText.trim() };
      const result: PortfolioChatOutput = await getPortfolioChatResponse(chatInput);
      
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
        const fallbackSuggestions = INITIAL_SUGGESTIONS
          .filter(s => s.toLowerCase() !== messageText.trim().toLowerCase())
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setCurrentSuggestions(fallbackSuggestions.length > 0 ? fallbackSuggestions : INITIAL_SUGGESTIONS.slice(0, 4));
      }

    } catch (error) {
      // console.error("Chatbot error:", error);
      let errorMessage = "Sorry, I encountered an issue. Please try asking in a different way or check back later.";
       if (error instanceof Error) {
        if (error.message.includes("system role is not supported") || error.message.includes("model_error")) {
            errorMessage = "There's a configuration issue with my AI. My team is on it!";
        } else if (error.message.includes("503") || error.message.toLowerCase().includes("overloaded")) {
            errorMessage = "My AI brain is a bit overloaded right now. Could you try that again in a moment?";
        }
      }
       const errorBotMessage: Message = {
        id: loadingBotMessageId,
        sender: 'bot',
        text: errorMessage,
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
    const clearedInitialMessage = { ...initialBotMessage, suggestions: INITIAL_SUGGESTIONS.slice(0,4) };
    setMessages([clearedInitialMessage]);
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
      description: "The conversation history has been cleared.",
      variant: "default"
    });
    inputRef.current?.focus();
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
        className="fixed bottom-6 right-6 z-50" // z-index for trigger button
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg hover:scale-110 transition-transform bg-primary hover:bg-primary/90 p-0 overflow-hidden"
          aria-label="Toggle Chatbot"
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Avatar className="h-full w-full">
              <AvatarImage 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISscdGPN0f7hp7m9wka0VumVDqmaJYAkDLPnWCjeb7WhsvMBICoPLDHfD_3uWziaZeAc&usqp=CAU" 
                alt="Sora AI Assistant" 
                data-ai-hint="woman headset"
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">SA</AvatarFallback>
            </Avatar>
          )}
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
            className={cn(
              "fixed bottom-24 z-40 rounded-xl bg-background shadow-2xl border border-border overflow-hidden flex flex-col",
              "left-4 right-4 w-auto", 
              "md:left-auto md:right-6 md:w-full md:max-w-md", 
              "lg:max-w-lg", 
              "xl:max-w-xl"  
            )}
            style={{ maxHeight: 'min(calc(100vh - 12rem), 85vh)' }} 
          >
            <header className="bg-card p-3 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-lg text-primary font-headline pl-2">Sora - Tinkal's Assistant</h3>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={handleClearChat} className="h-8 w-8 text-muted-foreground hover:text-destructive" aria-label="Clear Chat">
                  <Trash2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8" aria-label="Close Chat">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </header>

            {currentSuggestions.length > 0 && (
              <div className="p-3 border-b border-border bg-card/50">
                {!suggestionsExpanded ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-primary hover:bg-primary/10 py-2"
                    onClick={() => setSuggestionsExpanded(true)}
                    disabled={isLoading}
                  >
                    <MessageSquarePlus className="h-4 w-4 mr-2 opacity-80" />
                    View Suggestions
                    <ChevronDown className="h-4 w-4 ml-auto opacity-70" />
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-muted-foreground mb-2 hover:bg-muted/80 py-2"
                      onClick={() => setSuggestionsExpanded(false)}
                    >
                      <MessageSquarePlus className="h-4 w-4 mr-2 opacity-80" />
                      Hide Suggestions
                      <ChevronUp className="h-4 w-4 ml-auto opacity-70" />
                    </Button>
                    <div className="flex flex-wrap gap-2 justify-start">
                      {currentSuggestions.map((q, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-auto py-1.5 px-3 rounded-full shadow-sm hover:bg-accent hover:text-accent-foreground bg-card"
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

            <ScrollArea ref={scrollAreaRef} className="flex-grow p-4">
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
                  placeholder="Ask Sora about Tinkal..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-grow h-10"
                  aria-label="Type your message"
                />
                <Button type="submit" size="icon" disabled={isLoading || !currentInput.trim()} aria-label="Send message" className="h-10 w-10">
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

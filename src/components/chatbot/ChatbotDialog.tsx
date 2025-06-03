
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, X, MessageSquarePlus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { getPortfolioChatResponse, type PortfolioChatInput, type PortfolioChatOutput } from "@/ai/flows/portfolio-chat-flow";
import { AUTHOR_NAME } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  isLoading?: boolean;
}

const INITIAL_SUGGESTIONS = [
  `What are ${AUTHOR_NAME}'s key skills?`,
  `Tell me about a project ${AUTHOR_NAME} worked on.`,
  `What is ${AUTHOR_NAME}'s work experience?`,
  `How can I contact ${AUTHOR_NAME}?`,
  `What certifications does ${AUTHOR_NAME} hold?`,
  `Describe ${AUTHOR_NAME}'s education.`,
];

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS.slice(0,4));
  const [suggestionsExpanded, setSuggestionsExpanded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setMessages([
        {
          id: "initial-bot-message",
          sender: "bot",
          text: `Hello! I'm ${AUTHOR_NAME}'s AI assistant. Ask me about skills, projects, experience, or how to get in touch! You can also use the suggestions.`,
        },
      ]);
      setCurrentSuggestions(INITIAL_SUGGESTIONS.slice(0,4));
      setSuggestionsExpanded(false); 
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      // Optionally reset state if needed when closing
      // setMessages([]);
      // setCurrentInput("");
      // setSuggestionsExpanded(false);
    }
    return () => {
        document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      requestAnimationFrame(() => {
         scrollElement.scrollTo({
           top: scrollElement.scrollHeight,
           behavior: "smooth",
         });
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
        setCurrentSuggestions(result.suggestedFollowUps.filter(s => s && s.trim() !== "").slice(0, 4));
      } else {
        // Fallback if AI provides no suggestions
        const fallbackSuggestions = INITIAL_SUGGESTIONS
          .filter(s => s.toLowerCase() !== messageText.trim().toLowerCase()) // Avoid suggesting the exact same question
          .sort(() => 0.5 - Math.random()) // Shuffle for variety
          .slice(0,4);
        setCurrentSuggestions(fallbackSuggestions.length > 0 ? fallbackSuggestions : INITIAL_SUGGESTIONS.slice(0,4));
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
      setCurrentSuggestions(INITIAL_SUGGESTIONS.slice(0,4));
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
            className="fixed bottom-24 right-6 z-40 w-full max-w-md rounded-xl bg-background shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ height: 'min(75vh, 700px)'}} // Adjusted height
          >
            <header className="bg-card p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-lg text-primary font-headline">Chat with {AUTHOR_NAME}'s Assistant</h3>
               <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X className="h-5 w-5" />
              </Button>
            </header>
            
            {currentSuggestions.length > 0 && (
              <div className="p-3 border-b border-border bg-card/50">
                {!suggestionsExpanded ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-primary hover:bg-primary/10"
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
                      className="w-full justify-start text-sm text-muted-foreground mb-2 hover:bg-muted/80"
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

            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} isLoading={msg.isLoading} />
              ))}
            </ScrollArea>

            <footer className="p-4 border-t border-border bg-card">
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
                  placeholder={`Ask about ${AUTHOR_NAME}...`}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-grow"
                  aria-label="Type your message"
                />
                <Button type="submit" size="icon" disabled={isLoading || !currentInput.trim()} aria-label="Send message">
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

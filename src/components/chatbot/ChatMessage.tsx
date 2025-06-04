
"use client";

import type { LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, UserCircle2, Smile } from 'lucide-react'; 
import { AUTHOR_NAME } from '@/lib/data';

interface ChatMessageProps {
  sender: "user" | "bot";
  text: string;
  isLoading?: boolean;
}

export function ChatMessage({ sender, text, isLoading = false }: ChatMessageProps) {
  const isUser = sender === "user";
  const authorInitials = AUTHOR_NAME.split(" ").map(n => n[0]).join("").substring(0,2).toUpperCase();
  const soraInitials = "SA"; // Sora Assistant

  return (
    <div className={cn("flex items-start gap-3 mb-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 border border-primary/50">
          <AvatarImage src="https://static.vecteezy.com/system/resources/previews/038/281/907/large_2x/portrait-of-a-beautiful-woman-wearing-headset-photo.jpg" alt="Sora AI Assistant" data-ai-hint="headset portrait" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {soraInitials}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 text-sm shadow-md",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none border border-border"
        )}
      >
        {isLoading ? (
          <div className="flex items-center space-x-1">
            <span className="h-2 w-2 bg-current rounded-full animate-pulse delay-0"></span>
            <span className="h-2 w-2 bg-current rounded-full animate-pulse delay-150"></span>
            <span className="h-2 w-2 bg-current rounded-full animate-pulse delay-300"></span>
          </div>
        ) : (
          text.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < text.split('\n').length - 1 && <br />}
            </span>
          ))
        )}
      </div>
      {isUser && (
         <Avatar className="h-8 w-8 border border-muted-foreground/50">
          <AvatarFallback className="bg-muted text-muted-foreground">
            <UserCircle2 className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

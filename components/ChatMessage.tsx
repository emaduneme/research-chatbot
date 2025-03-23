'use client';

import React from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`
          max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3
          ${isBot 
            ? 'glass mr-auto dark:text-white' 
            : 'bg-[#2997ff] text-white ml-auto dark:bg-blue-600'
          }
        `}
      >
        {message.isLoading ? (
          // Loading animation bubbles
          <div className="flex items-center space-x-2 py-2 px-1">
            <div className="h-3 w-3 bg-[#2997ff] dark:bg-blue-400 rounded-full animate-bounce" 
                style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></div>
            <div className="h-3 w-3 bg-[#2997ff] dark:bg-blue-400 rounded-full animate-bounce" 
                style={{ animationDelay: '200ms', animationDuration: '0.8s' }}></div>
            <div className="h-3 w-3 bg-[#2997ff] dark:bg-blue-400 rounded-full animate-bounce" 
                style={{ animationDelay: '400ms', animationDuration: '0.8s' }}></div>
          </div>
        ) : (
          <>
            <p className="text-sm md:text-base">{message.content}</p>
            <span className="block mt-1 text-xs opacity-60">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </>
        )}
      </div>
    </div>
  );
} 
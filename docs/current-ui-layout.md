# Current UI Layout Code Reference

This document preserves the current UI layout code for reference purposes. If you need to revert to this version, you can copy the code from here.

## Main Page (app/page.tsx)

```typescript
'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import Header from '../components/Header';

// Define message type
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Replace with your actual n8n webhook URL
// const N8N_WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/path';

// Use the local mock API for testing
const N8N_WEBHOOK_URL = '/api/chat';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi, I am Mark. What can I help you with?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Generate a unique ID for the message
    const newId = Date.now().toString();
    
    // Add user message to chat
    const userMessage: Message = {
      id: newId,
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await response.json();
      
      // Add bot response to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your request. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col max-w-screen-lg mx-auto px-4 pb-6">
      <Header />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-4 mt-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </main>
  );
}
```

## Header Component (components/Header.tsx)

```typescript
import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 py-4 glass border-b border-gray-200/30">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Climate Change Solutions</h1>
        <button className="text-secondary hover:text-dark transition-colors px-4 py-1 text-sm">
          Theme
        </button>
      </div>
    </header>
  );
}
```

## ChatMessage Component (components/ChatMessage.tsx)

```typescript
import React from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
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
            ? 'glass mr-auto' 
            : 'bg-accent text-white ml-auto'
          }
        `}
      >
        <p className="text-sm md:text-base">{message.content}</p>
        <span className="block mt-1 text-xs opacity-60">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
```

## ChatInput Component (components/ChatInput.tsx)

```typescript
import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mt-4 glass rounded-2xl flex items-center p-2 sticky bottom-0">
      <input
        type="text"
        placeholder="Ask Mark..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none px-3 py-3 text-dark placeholder-secondary"
        disabled={isLoading}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        className={`
          p-3 rounded-full ml-2 transition-all
          ${message.trim() && !isLoading
            ? 'bg-accent text-white hover:bg-opacity-90'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
        aria-label="Send message"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <SendIcon />
        )}
      </button>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
```

## Global CSS (app/globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .glass {
    @apply bg-white/70 backdrop-blur-lg backdrop-filter;
  }
}

:root {
  --foreground-rgb: 29, 29, 31;
  --background-rgb: 245, 245, 247;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input, button, textarea {
  font-family: inherit;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(134, 134, 139, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(134, 134, 139, 0.5);
}
```

## API Mock (app/api/chat/route.ts)

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { message } = body;
  
  // Simple response generator based on user input
  let response = '';
  
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    response = 'Hello there! How can I help you with climate change solutions today?';
  } else if (message.toLowerCase().includes('climate') || message.toLowerCase().includes('global warming')) {
    response = 'Climate change is a critical issue that requires immediate action. Solutions include renewable energy, reducing carbon emissions, and sustainable practices.';
  } else if (message.toLowerCase().includes('renewable') || message.toLowerCase().includes('solar') || message.toLowerCase().includes('wind')) {
    response = 'Renewable energy sources like solar and wind power are essential alternatives to fossil fuels. They help reduce carbon emissions and combat climate change.';
  } else if (message.toLowerCase().includes('carbon') || message.toLowerCase().includes('emissions')) {
    response = 'Reducing carbon emissions is crucial for mitigating climate change. This can be achieved through renewable energy, energy efficiency, and sustainable transportation.';
  } else {
    response = `Thank you for your message. I'm a simple mock of an n8n webhook. To see more intelligent responses, you would need to connect to a real n8n instance with AI capabilities.`;
  }
  
  // Add a small delay to simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json({ response });
}
``` 
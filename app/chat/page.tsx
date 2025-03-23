'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

// Define message interface with isLoading property
interface ChatMessageType {
  id: string;
  content: string;
  isUser: boolean;
  isLoading?: boolean;
}

// Simple message component with dark mode support
const ChatMessage = ({ 
  content, 
  isUser, 
  isLoading 
}: { 
  content: string; 
  isUser: boolean; 
  isLoading?: boolean 
}) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div 
      className={`
        max-w-[85%] sm:max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3
        ${isUser 
          ? 'bg-[#2997ff] text-white ml-auto dark:bg-blue-600' 
          : 'bg-white/70 backdrop-blur-lg mr-auto border border-gray-200/30 dark:bg-gray-800/70 dark:border-gray-700/30 dark:text-white'
        }
      `}
    >
      {isLoading ? (
        // Loading animation bubbles
        <div className="flex items-center space-x-1 py-1">
          <div className="h-2 w-2 bg-accent dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2 w-2 bg-accent dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
          <div className="h-2 w-2 bg-accent dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
        </div>
      ) : (
        <p className="text-sm md:text-base">{content}</p>
      )}
    </div>
  </div>
);

// Simple input component with dark mode support
const ChatInput = ({ 
  onSend, 
  disabled 
}: { 
  onSend: (message: string) => void; 
  disabled: boolean 
}) => {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };
  
  return (
    <div className="relative">
      {/* Loading bubble that appears when isLoading is true */}
      {disabled && (
        <div className="absolute -top-16 left-4 glass dark:bg-gray-800/70 rounded-2xl p-3 flex items-center space-x-2 z-10 transform transition-all duration-300 shadow-md border border-gray-200/30 dark:border-gray-700/30">
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-accent dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 bg-accent dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="h-2 w-2 bg-accent dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </div>
          <span className="text-sm text-secondary dark:text-gray-300">Mark is thinking...</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mt-4 glass rounded-2xl flex items-center p-2 sticky bottom-0 dark:bg-gray-800/70 dark:border dark:border-gray-700/30">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Mark..."
          className="flex-1 bg-transparent border-none outline-none px-2 sm:px-3 py-2 sm:py-3 text-dark dark:text-white placeholder-secondary dark:placeholder-gray-400"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className={`
            p-2 sm:p-3 rounded-full ml-2 transition-all
            ${input.trim() && !disabled
              ? 'bg-[#2997ff] text-white hover:bg-opacity-90 dark:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            }
          `}
          aria-label="Send message"
        >
          {disabled ? (
            <LoadingIcon />
          ) : (
            <SendIcon />
          )}
        </button>
      </form>
    </div>
  );
};

// Loading spinner icon
const LoadingIcon = () => (
  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
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

// Send icon
const SendIcon = () => (
  <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ChatPage() {
  const initialMessage: ChatMessageType = { id: '1', content: 'Hi, I am Mark. What can I help you with?', isUser: false };
  const [messages, setMessages] = useState<ChatMessageType[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId] = useState(Date.now().toString());
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Reset conversation to initial state
  const handleNewChat = () => {
    setMessages([initialMessage]);
  };
  
  // Send message to n8n webhook
  const sendMessage = async (content: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { id: Date.now().toString(), content, isUser: true }]);
    
    // Add loading message with a small delay to ensure it appears after the user message
    const loadingId = 'loading-' + Date.now();
    setTimeout(() => {
      setMessages(prev => [...prev, { id: loadingId, content: '', isUser: false, isLoading: true }]);
    }, 100);
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/n8n-chat?action=sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          chatInput: content
        })
      });
      
      const data = await response.json();
      
      // Remove loading message and add bot response
      setMessages(prev => {
        // Filter out loading message
        const filtered = prev.filter(msg => msg.id !== loadingId);
        
        // Add bot response
        return [...filtered, { 
          id: (Date.now()+1).toString(), 
          content: data.response || data.output || data.message || 'Sorry, I could not process your request.', 
          isUser: false 
        }];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove loading message and add error message
      setMessages(prev => {
        // Filter out loading message
        const filtered = prev.filter(msg => msg.id !== loadingId);
        
        // Add error message
        return [...filtered, { 
          id: (Date.now()+1).toString(), 
          content: 'Sorry, there was an error connecting to the server.', 
          isUser: false 
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className="max-w-screen-lg mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <Header onNewChat={handleNewChat} />
      
      {/* Chat container */}
      <div className="mt-4 sm:mt-6 flex flex-col h-[calc(100vh-130px)]">
        <div className="flex-1 overflow-y-auto">
          {messages.map(msg => (
            <ChatMessage 
              key={msg.id} 
              content={msg.content} 
              isUser={msg.isUser} 
              isLoading={msg.isLoading}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </main>
  );
} 
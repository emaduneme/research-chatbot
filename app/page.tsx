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
  isLoading?: boolean;
}

// n8n webhook URL - use the API route instead of direct call
const N8N_WEBHOOK_URL = '/api/n8n-chat';

// Initial welcome message
const WELCOME_MESSAGE: Message = {
  id: '1',
  content: 'Hi, I am Mark. What can I help you with?',
  sender: 'bot',
  timestamp: new Date(),
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset conversation to initial state
  const handleNewChat = () => {
    setMessages([{...WELCOME_MESSAGE, timestamp: new Date()}]);
  };

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
    
    // Add loading message with unique ID
    const loadingId = 'loading-' + Date.now();
    
    // First add the user message
    setMessages((prev) => [...prev, userMessage]);
    
    // Then add the loading message in a separate update to ensure it's properly displayed
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: loadingId,
        content: '',
        sender: 'bot',
        timestamp: new Date(),
        isLoading: true
      }]);
    }, 100);
    
    setIsLoading(true);
    
    try {
      // Call our proxy API route instead of n8n directly
      const response = await fetch(`${N8N_WEBHOOK_URL}?action=sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: 'chat-session-' + Date.now(),
          chatInput: message
        }),
      });
      
      const data = await response.json();
      
      // Remove loading message and add bot response
      setMessages((prev) => {
        // Filter out loading message
        const filteredMessages = prev.filter(msg => msg.id !== loadingId);
        
        // Add bot response
        return [...filteredMessages, {
          id: (Date.now() + 1).toString(),
          content: data.response || data.output || data.message || 'Sorry, I could not process your request.',
          sender: 'bot',
          timestamp: new Date(),
        }];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove loading message and add error message
      setMessages((prev) => {
        // Filter out loading message
        const filteredMessages = prev.filter(msg => msg.id !== loadingId);
        
        // Add error message
        return [...filteredMessages, {
          id: (Date.now() + 1).toString(),
          content: 'Sorry, there was an error processing your request. Please try again later.',
          sender: 'bot',
          timestamp: new Date(),
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col max-w-screen-lg mx-auto px-2 sm:px-4 pb-6">
      <Header onNewChat={handleNewChat} />
      
      <div className="flex-1 overflow-hidden flex flex-col h-[calc(100vh-120px)]">
        <div className="flex-1 overflow-y-auto pb-4 mt-4 sm:mt-6">
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
'use client';

import React, { useState, useEffect, useRef } from 'react';

// The component will create a floating chat button in the corner that opens a chat window
export default function FloatingN8nChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{content: string, sender: 'user' | 'bot', timestamp: Date}>>([
    {
      content: 'Hi, I am Mark. What can I help you with?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Add click handler directly in useEffect to ensure proper event binding
  useEffect(() => {
    const button = chatButtonRef.current;
    
    if (button) {
      const handleClick = () => {
        setIsOpen(!isOpen);
      };
      
      button.addEventListener('click', handleClick);
      
      return () => {
        button.removeEventListener('click', handleClick);
      };
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      content: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/n8n-chat?action=sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        }),
      });
      
      const data = await response.json();
      
      // Add bot response to chat
      const botMessage = {
        content: data.response || 'Sorry, I had trouble processing that.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage = {
        content: 'Sorry, there was an error sending your message. Please try again.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button with direct ref */}
      <button
        ref={chatButtonRef}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full glass flex items-center justify-center shadow-lg hover:opacity-90 transition-all z-50 border border-gray-200/30"
        aria-label="Open chat"
        type="button"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-80 sm:w-96 h-96 glass rounded-2xl shadow-xl flex flex-col z-50 border border-gray-200/30">
          {/* Chat header with close button */}
          <div className="p-3 glass border-b border-gray-200/30 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-medium">Climate Change Solutions</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-200/50 transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} mb-4`}
              >
                <div 
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-3
                    ${msg.sender === 'bot' 
                      ? 'glass mr-auto' 
                      : 'bg-accent text-white ml-auto'
                    }
                  `}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className="block mt-1 text-xs opacity-60">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="p-3 glass border-t border-gray-200/30 rounded-b-2xl">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask Mark..."
                className="flex-1 bg-transparent border-none outline-none px-3 py-3 text-dark placeholder-secondary"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`
                  p-3 rounded-full ml-2 transition-all
                  ${inputMessage.trim() && !isLoading
                    ? 'bg-accent text-white hover:bg-opacity-90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Send message"
              >
                {isLoading ? (
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
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 
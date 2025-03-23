'use client';

import React, { useEffect } from 'react';

export default function N8nChatPage() {
  useEffect(() => {
    // We need to dynamically load the n8n chat script because it's client-side
    const loadN8nChat = async () => {
      // Add the CSS
      const link = document.createElement('link');
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Import the chat module
      try {
        // Need to dynamically import this using 'import()' instead of 'import from'
        const { createChat } = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        
        // Create the chat with your webhook URL
        createChat({
          webhookUrl: 'https://emaduneme.app.n8n.cloud/webhook/2512b3b5-c75f-44a8-af7c-066e4ff241a2/chat',
          mode: 'fullscreen', // Use fullscreen mode
          initialMessages: [
            'Hi, I am Mark. What can I help you with?'
          ],
          i18n: {
            en: {
              title: 'Climate Change Solutions',
              subtitle: "Ask me anything about climate change and sustainable solutions.",
              getStarted: 'New Conversation',
              inputPlaceholder: 'Ask Mark...',
            },
          },
        });
      } catch (error) {
        console.error('Failed to load n8n chat:', error);
      }
    };

    loadN8nChat();
  }, []);

  return (
    <div id="n8n-chat" className="w-full h-screen"></div>
  );
} 
'use client';

import React from 'react';
import Link from 'next/link';

export default function N8nChatPage() {
  // For GitHub Pages static export, we've removed the dynamic n8n chat import
  // and replaced it with a simple redirect/link to the main chat page

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">n8n Chat Integration</h1>
      <p className="text-center mb-6 max-w-md">
        The direct n8n chat integration is not available in the static build.
        Please use our custom chat interface instead.
      </p>
      <Link 
        href="/"
        className="px-4 py-2 bg-[#2997ff] text-white rounded-full hover:bg-opacity-90"
      >
        Go to Main Chat
      </Link>
    </div>
  );
} 
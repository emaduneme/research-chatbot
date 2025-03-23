import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Climate Change Solutions</h1>
      <p className="text-lg mb-6">This is a simplified home page for testing routing.</p>
      
      <div className="flex flex-col gap-4">
        <Link href="/test" className="text-blue-500 hover:underline">
          Go to Test Page
        </Link>
        <Link href="/index" className="text-blue-500 hover:underline">
          Go to Index Test Page
        </Link>
        <Link href="/" className="text-blue-500 hover:underline">
          Go to Root
        </Link>
      </div>
    </div>
  );
} 
import React from 'react';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Index Test Page</h1>
      <p>If you can see this, routing is working correctly!</p>
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Go to home
        </Link>
      </div>
    </div>
  );
} 
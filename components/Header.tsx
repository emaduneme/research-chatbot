'use client';

import React, { useEffect, useState } from 'react';

interface HeaderProps {
  onNewChat?: () => void;
}

export default function Header({ onNewChat }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Update theme when component mounts and when theme changes
  useEffect(() => {
    // Check if user has theme preference stored
    const storedTheme = localStorage.getItem('theme');
    // Check system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on stored preference or system preference
    const initialDarkMode = storedTheme === 'dark' || (!storedTheme && systemTheme);
    setIsDarkMode(initialDarkMode);
    
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // Handle theme toggle
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Update DOM and localStorage
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  return (
    <header className="sticky top-0 z-10 py-4 px-6 glass border-b border-gray-200/30 dark:border-gray-700/30 rounded-b-2xl mx-4 mb-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium dark:text-white">Climate Change Solutions</h1>
        <div className="flex items-center space-x-2">
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="h-4 w-4 text-yellow-300" />
            ) : (
              <MoonIcon className="h-4 w-4 text-gray-600" />
            )}
          </button>
          
          {/* New chat button */}
          <button 
            onClick={onNewChat}
            className="px-4 py-2 rounded-full glass hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-colors text-sm font-medium flex items-center dark:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Chat
          </button>
        </div>
      </div>
    </header>
  );
}

// Sun icon for light mode
const SunIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);

// Moon icon for dark mode
const MoonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
); 
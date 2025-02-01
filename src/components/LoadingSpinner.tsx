import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="relative w-24 h-24">
      {/* Outer ring */}
      <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
      
      {/* Spinning gradient ring */}
      <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin-slow">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>
      </div>
      
      {/* Inner pulse */}
      <div className="absolute inset-4 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full animate-pulse"></div>
      
      {/* Center dot */}
      <div className="absolute inset-[45%] bg-white dark:bg-gray-900 rounded-full"></div>
    </div>
    <div className="mt-4 text-center">
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Analyzing with AI
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Please wait while we process your request
      </div>
    </div>
  </div>
);

import React from 'react';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative w-48 sm:w-64 h-48 sm:h-64">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        
        {/* Rotating rings */}
        <div className="absolute inset-0">
          <div className="w-full h-full rounded-full border-4 border-t-purple-500 border-r-blue-500 border-b-purple-500 border-l-transparent animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-blue-500 border-l-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>

        {/* Center element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 sm:w-20 h-16 sm:h-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateY(-32px)`,
              animation: 'float 2s ease-in-out infinite',
              animationDelay: `${i * 0.25}s`
            }}
          />
        ))}
      </div>

      {/* Text content */}
      <div className="mt-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-3">
          Analyzing with AI
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
          Processing data and generating insights...
        </p>
        <div className="flex items-center justify-center gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-500"
              style={{
                animation: 'bounce 1s infinite',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

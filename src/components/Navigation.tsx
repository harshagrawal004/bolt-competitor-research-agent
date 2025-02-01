import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, History } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/analyze', icon: Search, label: 'Analyze' },
    { path: '/history', icon: History, label: 'History' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around md:justify-end items-center h-16">
          {links.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                  }`}
              >
                <Icon className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

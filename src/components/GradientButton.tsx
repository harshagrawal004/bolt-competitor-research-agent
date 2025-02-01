import React from 'react';

interface GradientButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 
      text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] 
      transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 
      group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative flex items-center justify-center">
      {children}
    </div>
  </button>
);

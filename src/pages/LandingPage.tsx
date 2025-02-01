import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowRight } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8 relative">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-20"></div>
          <Bot size={80} className="relative text-purple-500 animate-float" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            AI-Powered Company Analysis
          </span>
        </h1>
        
        <p className="text-xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Unlock powerful insights about any company using our advanced AI analysis platform
        </p>

        <GradientButton 
          onClick={() => navigate('/analyze')} 
          className="text-lg px-8 py-4 group"
        >
          Start Analyzing
          <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
        </GradientButton>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: 'Real-time Analysis',
              description: 'Get instant insights about any company using our advanced AI algorithms'
            },
            {
              title: 'Comprehensive Data',
              description: 'Access detailed information about market position, competitors, and trends'
            },
            {
              title: 'Smart Insights',
              description: 'Receive AI-generated recommendations and strategic analysis'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

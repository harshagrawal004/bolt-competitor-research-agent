import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { GradientButton } from '../components/GradientButton';
import { ArrowLeft, Globe, Building2, AlertCircle } from 'lucide-react';

export const AnalysisForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: ''
  });

  const validateUrl = (url: string): boolean => {
    // Remove any existing protocol and www
    const cleanUrl = url.trim().toLowerCase()
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '');
    
    // Basic domain validation regex
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(cleanUrl);
  };

  const formatUrl = (url: string): string => {
    // Remove any existing protocol, www and trailing slashes
    const cleanUrl = url.trim().toLowerCase()
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '');
    
    return `https://${cleanUrl}`;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove any protocol if user tries to enter it
    const cleanValue = value.replace(/^(https?:\/\/)/, '');
    setFormData(prev => ({ ...prev, websiteUrl: cleanValue }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateUrl(formData.websiteUrl)) {
      setError('Please enter a valid domain (e.g., example.com)');
      return;
    }

    setLoading(true);

    try {
      const webhookUrl = 'https://n8n-self-bowt.onrender.com/webhook/43999c32-ff3f-4c32-838a-88e5c104d4b0';
      const formattedUrl = formatUrl(formData.websiteUrl);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          websiteUrl: formattedUrl,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      navigate('/results', { 
        state: { 
          analysis: {
            companyName: formData.companyName,
            websiteUrl: formattedUrl,
            analysisDate: new Date().toISOString(),
            analysis: data
          }
        } 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze company');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Company Analysis
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Building2 className="w-4 h-4 mr-2" />
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-700 dark:text-white
                  transition-all duration-200 ease-in-out outline-none"
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Globe className="w-4 h-4 mr-2" />
                Website URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">https://</span>
                </div>
                <input
                  type="text"
                  value={formData.websiteUrl}
                  onChange={handleUrlChange}
                  className="w-full pl-[4.5rem] pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-700 dark:text-white
                    transition-all duration-200 ease-in-out outline-none"
                  placeholder="example.com"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 ml-1">
                <AlertCircle className="w-3 h-3" />
                Enter domain only (e.g., example.com)
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              </div>
            )}

            <GradientButton 
              type="submit" 
              className="w-full py-4 text-lg font-medium mt-8"
            >
              Analyze Company
            </GradientButton>
          </form>
        </div>
      </div>
    </div>
  );
};

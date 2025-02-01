import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  ArrowUpDown, 
  Trash2, 
  ExternalLink,
  Clock,
  Filter
} from 'lucide-react';
import { GradientButton } from '../components/GradientButton';

// Mock data - Replace with actual storage implementation
const mockHistory = [
  {
    id: '1',
    companyName: 'MindSightAI',
    websiteUrl: 'https://zapier.com/app/home',
    analysisDate: '2024-01-31T23:22:55.849Z',
    analysis: {
      text: '## Market Position\n- Current Position: AI sector leader...'
    }
  },
  // Add more mock items as needed
];

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterDate, setFilterDate] = useState('');

  // Filter and sort analyses
  const filteredAnalyses = mockHistory
    .filter(item => {
      const matchesSearch = item.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = filterDate ? new Date(item.analysisDate).toLocaleDateString().includes(filterDate) : true;
      return matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.analysisDate).getTime() - new Date(a.analysisDate).getTime()
          : new Date(a.analysisDate).getTime() - new Date(b.analysisDate).getTime();
      } else {
        return sortOrder === 'desc'
          ? b.companyName.localeCompare(a.companyName)
          : a.companyName.localeCompare(b.companyName);
      }
    });

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete analysis:', id);
  };

  const handleView = (analysis: typeof mockHistory[0]) => {
    navigate('/results', { state: { analysis } });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Analysis History</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage your previous company analyses</p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 
                  dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowUpDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAnalyses.map((item) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {item.companyName}
                  </h3>
                  <a 
                    href={item.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-500 hover:text-purple-600 dark:text-purple-400 
                      flex items-center gap-1"
                  >
                    {item.websiteUrl}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(item)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                      text-gray-600 dark:text-gray-400 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 
                      text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(item.analysisDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {/* Preview */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {item.analysis.text.substring(0, 150)}...
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnalyses.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No analyses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <GradientButton onClick={() => navigate('/analyze')}>
              Start New Analysis
            </GradientButton>
          </div>
        )}
      </div>
    </div>
  );
};

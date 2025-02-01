import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GradientButton } from '../components/GradientButton';
import { 
  ArrowLeft, 
  Download,
  Globe,
  Calendar,
  Building2,
  Target,
  TrendingUp,
  Users,
  Rocket,
  LineChart,
  BarChart4,
  PieChart,
  Network,
  Briefcase,
  Flag
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface AnalysisData {
  companyName: string;
  websiteUrl: string;
  analysisDate: string;
  analysis: {
    text: string;
  };
}

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis as AnalysisData | undefined;

  const parseContent = useCallback((text: string) => {
    return text.split('##')
      .filter(Boolean)
      .map(section => {
        const [title, ...content] = section.split('\n');
        
        const cleanContent = content
          .join(' ')
          .replace(/\*\*/g, '')
          .replace(/- /g, '')
          .replace(/\s+/g, ' ')
          .trim();

        const paragraphs = cleanContent.split(/(?=Current Position:|Competitive advantage:|Target audience:|Recent launches:|Pipeline developments:|Leadership Changes:|Strategic Initiatives:|Company Announcements:|Funding Rounds:|Revenue Indicators:|Market Share:|Growth Metrics:)/g);

        return {
          title: title.trim(),
          paragraphs: paragraphs
            .map(p => p.trim())
            .filter(Boolean)
        };
      });
  }, []);

  const sections = analysis ? parseContent(analysis.analysis.text) : [];

  const downloadPDF = useCallback(() => {
    if (!analysis) return;

    try {
      const doc = new jsPDF();
      
      // Add header
      doc.setFontSize(24);
      doc.setTextColor(88, 80, 236);
      doc.text(analysis.companyName, 20, 20);
      
      let yPosition = 40;

      sections.forEach(section => {
        // Section title
        doc.setFontSize(18);
        doc.setTextColor(88, 80, 236);
        doc.text(section.title, 20, yPosition);
        yPosition += 15;

        // Section paragraphs
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);

        section.paragraphs.forEach(paragraph => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }

          const lines = doc.splitTextToSize(paragraph, 170);
          lines.forEach(line => {
            doc.text(line, 20, yPosition);
            yPosition += 8;
          });
          
          yPosition += 10;
        });
      });

      const fileName = `${analysis.companyName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_analysis.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  }, [analysis, sections]);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">No Analysis Data Found</h2>
          <GradientButton onClick={() => navigate('/analyze')}>
            Start New Analysis
          </GradientButton>
        </div>
      </div>
    );
  }

  const sectionIcons: Record<string, React.ElementType> = {
    'Market Position': Building2,
    'Product Portfolio': Briefcase,
    'Corporate Updates': Users,
    'Financial Status': LineChart,
    'Growth Metrics': TrendingUp,
    'Competitive Analysis': Target,
    'Strategic Initiatives': Flag,
    'Technology Stack': Network,
    'Market Share': PieChart,
    'Revenue Analysis': BarChart4,
    'Future Outlook': Rocket
  };

  const getIconForSection = (title: string) => {
    const defaultIcon = Building2;
    const IconComponent = sectionIcons[title] || defaultIcon;
    return <IconComponent className="w-6 h-6 text-purple-500 dark:text-purple-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate('/analyze')}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-500 
              dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Analysis
          </button>
          <GradientButton
            onClick={downloadPDF}
            className="flex items-center justify-center gap-2 px-6 py-2.5"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Download Report</span>
            <span className="sm:hidden">Download</span>
          </GradientButton>
        </div>

        {/* Company Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
                {analysis.companyName}
              </h1>
              <a
                href={analysis.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-purple-500 hover:text-purple-600 dark:text-purple-400 text-sm"
              >
                <Globe className="w-4 h-4 mr-1.5" />
                {analysis.websiteUrl}
              </a>
            </div>
            <div className="flex items-center px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-sm">
              <Calendar className="w-4 h-4 text-purple-500 mr-1.5" />
              <time className="text-gray-700 dark:text-gray-300">
                {new Date(analysis.analysisDate).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div>

        {/* Analysis Content */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    {getIconForSection(section.title)}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                    {section.title}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Analysis generated on {new Date(analysis.analysisDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

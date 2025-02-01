export interface CompanyAnalysis {
  id: string;
  companyName: string;
  websiteUrl: string;
  analysisDate: string;
  results: any; // Type this based on actual AI response structure
  saved: boolean;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

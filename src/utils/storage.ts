import { CompanyAnalysis } from '../types';

const STORAGE_KEY = 'analysisHistory';

export const saveAnalysis = (analysis: CompanyAnalysis) => {
  try {
    const history = getAnalysisHistory();
    const updatedHistory = [analysis, ...history];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error saving analysis:', error);
    return false;
  }
};

export const getAnalysisHistory = (): CompanyAnalysis[] => {
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting analysis history:', error);
    return [];
  }
};

export const deleteAnalysis = (id: string) => {
  try {
    const history = getAnalysisHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error deleting analysis:', error);
    return false;
  }
};

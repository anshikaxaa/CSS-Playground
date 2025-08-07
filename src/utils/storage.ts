import { CodeSnippet } from '../types';

const STORAGE_KEY = 'css-playground-snippets';

export const saveSnippet = (snippet: CodeSnippet): void => {
  try {
    const existingSnippets = getSnippets();
    const updatedSnippets = existingSnippets.filter(s => s.id !== snippet.id);
    updatedSnippets.push(snippet);
    
    // Sort by updatedAt (newest first)
    updatedSnippets.sort((a, b) => b.updatedAt - a.updatedAt);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSnippets));
  } catch (error) {
    console.error('Error saving snippet:', error);
  }
};

export const getSnippets = (): CodeSnippet[] => {
  try {
    const snippets = localStorage.getItem(STORAGE_KEY);
    return snippets ? JSON.parse(snippets) : [];
  } catch (error) {
    console.error('Error loading snippets:', error);
    return [];
  }
};

export const deleteSnippet = (id: string): void => {
  try {
    const existingSnippets = getSnippets();
    const updatedSnippets = existingSnippets.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSnippets));
  } catch (error) {
    console.error('Error deleting snippet:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const exportSnippet = (snippet: CodeSnippet): string => {
  return JSON.stringify(snippet, null, 2);
};

export const importSnippet = (jsonString: string): CodeSnippet | null => {
  try {
    const snippet = JSON.parse(jsonString);
    if (snippet.html !== undefined && snippet.css !== undefined && snippet.title) {
      return {
        ...snippet,
        id: generateId(),
        createdAt: snippet.createdAt || Date.now(),
        updatedAt: Date.now()
      };
    }
    return null;
  } catch (error) {
    console.error('Error importing snippet:', error);
    return null;
  }
}; 
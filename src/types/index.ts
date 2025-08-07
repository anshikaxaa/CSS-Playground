export interface CodeSnippet {
  id: string;
  title: string;
  html: string;
  css: string;
  createdAt: number;
  updatedAt: number;
}

export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  language: 'html' | 'css';
}

export interface PreviewProps {
  html: string;
  css: string;
}

export interface SavedSnippetsProps {
  snippets: CodeSnippet[];
  onLoadSnippet: (snippet: CodeSnippet) => void;
  onDeleteSnippet: (id: string) => void;
  currentSnippetId?: string;
} 
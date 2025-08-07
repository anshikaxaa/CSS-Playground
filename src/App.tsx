import React, { useState, useEffect } from 'react';
import { CodeSnippet } from './types';
import { saveSnippet, getSnippets, deleteSnippet, generateId } from './utils/storage';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import SavedSnippets from './components/SavedSnippets';
import { 
  Sun, 
  Moon, 
  Save, 
  RotateCcw, 
  Play, 
  Pause,
  Download,
  Upload
} from 'lucide-react';

const defaultHTML = `<!DOCTYPE html>
<html>
<head>
  <title>My Awesome Page</title>
</head>
<body>
  <div class="container">
    <h1>Welcome to Live CSS Playground!</h1>
    <p>Start editing the HTML and CSS to see live changes.</p>
    <button class="btn">Click me!</button>
  </div>
</body>
</html>`;

const defaultCSS = `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.btn {
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}`;

function App() {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCSS] = useState(defaultCSS);
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [currentSnippetId, setCurrentSnippetId] = useState<string | undefined>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [snippetTitle, setSnippetTitle] = useState('Untitled Snippet');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Load saved snippets on mount
  useEffect(() => {
    const savedSnippets = getSnippets();
    setSnippets(savedSnippets);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSaveSnippet = () => {
    const snippet: CodeSnippet = {
      id: currentSnippetId || generateId(),
      title: snippetTitle,
      html,
      css,
      createdAt: currentSnippetId ? snippets.find(s => s.id === currentSnippetId)?.createdAt || Date.now() : Date.now(),
      updatedAt: Date.now()
    };

    saveSnippet(snippet);
    setSnippets(getSnippets());
    setCurrentSnippetId(snippet.id);
    setShowSaveDialog(false);
  };

  const handleLoadSnippet = (snippet: CodeSnippet) => {
    setHtml(snippet.html);
    setCSS(snippet.css);
    setSnippetTitle(snippet.title);
    setCurrentSnippetId(snippet.id);
  };

  const handleDeleteSnippet = (id: string) => {
    deleteSnippet(id);
    setSnippets(getSnippets());
    if (currentSnippetId === id) {
      setCurrentSnippetId(undefined);
      setSnippetTitle('Untitled Snippet');
    }
  };

  const handleReset = () => {
    setHtml(defaultHTML);
    setCSS(defaultCSS);
    setSnippetTitle('Untitled Snippet');
    setCurrentSnippetId(undefined);
  };

  const handleExport = () => {
    const snippet: CodeSnippet = {
      id: generateId(),
      title: snippetTitle,
      html,
      css,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const dataStr = JSON.stringify(snippet, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${snippetTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Live CSS Playground
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Real-Time HTML/CSS Editor
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Auto Update Toggle */}
              <button
                onClick={() => setAutoUpdate(!autoUpdate)}
                className={`p-2 rounded-lg transition-colors ${
                  autoUpdate 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
                title={autoUpdate ? 'Auto-update enabled' : 'Auto-update disabled'}
              >
                {autoUpdate ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="theme-toggle"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Editors */}
          <div className="lg:col-span-2 space-y-6">
            {/* HTML Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  HTML Editor
                </h2>
              </div>
              <CodeEditor
                value={html}
                onChange={setHtml}
                placeholder="Enter your HTML code here..."
                language="html"
                autoUpdate={autoUpdate}
              />
            </div>

            {/* CSS Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  CSS Editor
                </h2>
              </div>
              <CodeEditor
                value={css}
                onChange={setCSS}
                placeholder="Enter your CSS code here..."
                language="css"
                autoUpdate={autoUpdate}
              />
            </div>
          </div>

          {/* Right Column - Preview and Controls */}
          <div className="space-y-6">
            {/* Preview */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Live Preview
              </h2>
              <Preview html={html} css={css} />
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Save Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Save & Export
                </h3>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={snippetTitle}
                      onChange={(e) => setSnippetTitle(e.target.value)}
                      placeholder="Snippet title..."
                      className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowSaveDialog(true)}
                      className="btn-primary flex items-center space-x-1 flex-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleExport}
                      className="btn-secondary flex items-center space-x-1"
                      title="Export as JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Actions
                </h3>
                <button
                  onClick={handleReset}
                  className="btn-danger w-full flex items-center justify-center space-x-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Default</span>
                </button>
              </div>

              {/* Saved Snippets */}
              <SavedSnippets
                snippets={snippets}
                onLoadSnippet={handleLoadSnippet}
                onDeleteSnippet={handleDeleteSnippet}
                currentSnippetId={currentSnippetId}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Save Snippet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Save "{snippetTitle}" to your local storage?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleSaveSnippet}
                className="btn-primary flex-1"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 
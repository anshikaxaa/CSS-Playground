import React, { useState } from 'react';
import { SavedSnippetsProps, CodeSnippet } from '../types';
import { Trash2, Download, Upload, FileText } from 'lucide-react';

const SavedSnippets: React.FC<SavedSnippetsProps> = ({
  snippets,
  onLoadSnippet,
  onDeleteSnippet,
  currentSnippetId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [importData, setImportData] = useState('');

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString() + ' ' + 
           new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleExport = (snippet: CodeSnippet) => {
    const dataStr = JSON.stringify(snippet, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${snippet.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const snippet = JSON.parse(importData);
      if (snippet.html !== undefined && snippet.css !== undefined && snippet.title) {
        onLoadSnippet({
          ...snippet,
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          createdAt: snippet.createdAt || Date.now(),
          updatedAt: Date.now()
        });
        setImportData('');
      }
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Saved Snippets</span>
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-4 space-y-4">
          {/* Import Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Import Snippet</h4>
            <div className="flex space-x-2">
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="Paste JSON snippet here..."
                className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows={3}
              />
              <button
                onClick={handleImport}
                className="btn-secondary flex items-center space-x-1"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
            </div>
          </div>

          {/* Snippets List */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Saved Snippets ({snippets.length})
            </h4>
            {snippets.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No saved snippets yet. Create and save your first snippet!
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {snippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentSnippetId === snippet.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="flex-1 min-w-0"
                        onClick={() => onLoadSnippet(snippet)}
                      >
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {snippet.title}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(snippet.updatedAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExport(snippet);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                          title="Export snippet"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSnippet(snippet.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Delete snippet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSnippets; 
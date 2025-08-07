import React, { useRef, useEffect, useState } from 'react';
import { EditorProps } from '../types';

const CodeEditor: React.FC<EditorProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  language 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);

  // Generate line numbers
  useEffect(() => {
    const lines = value.split('\n');
    const numbers = lines.map((_, index) => (index + 1).toString());
    setLineNumbers(numbers);
  }, [value]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after tab
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="editor-container rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            language === 'html' ? 'bg-orange-500' : 'bg-blue-500'
          }`}></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {language.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        {/* Line Numbers */}
        <div className="editor-line-numbers">
          {lineNumbers.map((number) => (
            <div key={number} className="text-gray-500 dark:text-gray-400">
              {number}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="editor-content pl-16"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
};

export default CodeEditor; 
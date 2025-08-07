import React, { useRef, useEffect } from 'react';
import { PreviewProps } from '../types';

const Preview: React.FC<PreviewProps> = ({ html, css }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Preview</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                html, body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  width: 100%;
                  height: 100%;
                  overflow: auto;
                }
                /* Ensure content scales properly */
                body {
                  min-height: 100vh;
                  display: flex;
                  flex-direction: column;
                }
                /* Make sure content doesn't get cut off */
                * {
                  max-width: 100%;
                }
                /* Responsive scaling for different aspect ratios */
                @media (max-aspect-ratio: 1/1) {
                  body {
                    min-height: auto;
                    height: auto;
                  }
                }
                ${css}
              </style>
            </head>
            <body>
              ${html || '<div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; color: #666; font-size: 18px; text-align: center; padding: 20px;">Start typing HTML to see the preview...</div>'}
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [html, css]);

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            PREVIEW
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="relative w-full h-full min-h-[400px] overflow-auto">
        <iframe
          ref={iframeRef}
          className="preview-frame w-full h-full min-h-[400px]"
          title="Code Preview"
          sandbox="allow-scripts allow-same-origin"
          style={{
            border: 'none',
            background: 'white',
            minHeight: '400px',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default Preview; 
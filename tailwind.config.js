/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        'editor-bg': '#1e1e1e',
        'editor-fg': '#d4d4d4',
        'editor-line': '#2d2d30',
        'editor-selection': '#264f78',
      }
    },
  },
  plugins: [],
} 
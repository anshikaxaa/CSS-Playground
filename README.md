# Live CSS Playground 🎨

A real-time HTML and CSS editor with live preview, inspired by CodePen and JSFiddle. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### Core Features
- **🧾 HTML Editor** - Syntax-highlighted editor with line numbers
- **🎨 CSS Editor** - Full CSS support with real-time syntax checking
- **⚡ Live Preview** - Instant preview updates as you type
- **🖼️ Preview Pane** - Isolated iframe rendering for accurate results
- **🧹 Reset Button** - Quick reset to default template

### Bonus Features
- **💾 Save Snippets** - Save your work to localStorage
- **📂 Load Snippets** - Manage and load saved snippets
- **🎨 Dark/Light Theme** - Toggle between themes
- **🖋️ Editable Titles** - Custom names for your snippets
- **🔄 Auto-Update Toggle** - Control when preview updates
- **📤 Export/Import** - Share snippets as JSON files

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd live-css-playground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

To test the production build locally:

```bash
npm run build
npm run serve
```

Then visit `http://localhost:3000`

## 🛠️ Tech Stack

| Purpose | Technology |
|---------|------------|
| **Core Framework** | React 18 + TypeScript |
| **Styling** | Tailwind CSS |
| **Code Editing** | Custom textarea with line numbers |
| **Live Preview** | iframe with dynamic content |
| **Data Persistence** | localStorage |
| **Icons** | Lucide React |
| **Build Tool** | Vite |

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeEditor.tsx      # HTML/CSS editor component
│   ├── Preview.tsx         # Live preview iframe
│   └── SavedSnippets.tsx   # Snippet management
├── types/
│   └── index.ts           # TypeScript interfaces
├── utils/
│   └── storage.ts         # localStorage utilities
├── App.tsx                # Main application component
├── main.tsx              # React entry point
└── index.css             # Global styles
```

## 🎯 Usage

### Basic Usage
1. **Start Coding**: The app loads with a default HTML/CSS template
2. **Edit HTML**: Modify the HTML in the left editor
3. **Style with CSS**: Add styles in the CSS editor
4. **See Results**: Watch the preview update in real-time

### Advanced Features

#### Saving Snippets
1. Enter a title for your snippet
2. Click "Save" to store it locally
3. Access saved snippets from the sidebar

#### Importing/Exporting
- **Export**: Click the download icon to save as JSON
- **Import**: Paste JSON in the import section

#### Theme Switching
- Toggle between light and dark themes using the theme button

#### Auto-Update Control
- Toggle the play/pause button to control live updates
- Useful for performance on complex code

## 🎨 Default Template

The app comes with a beautiful gradient template that demonstrates:
- Modern CSS gradients
- Responsive design
- Hover effects
- Typography styling

## 🔧 Customization

### Adding New Templates
Edit the `defaultHTML` and `defaultCSS` constants in `App.tsx` to change the initial template.

### Styling
The app uses Tailwind CSS. Modify `tailwind.config.js` to customize the design system.

### Editor Features
Enhance the `CodeEditor` component to add:
- Syntax highlighting
- Code folding
- Multiple cursors
- Search and replace

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

### GitHub Pages (Automatic)

The app is configured to automatically deploy to GitHub Pages when you push to the main branch. The GitHub Actions workflow will:

1. Build the production version
2. Deploy to GitHub Pages
3. Make it available at `https://yourusername.github.io/your-repo-name`

### Manual Deployment

You can also deploy to other platforms:

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Drag the dist folder to Netlify
```

## 🤝 Contributing

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by CodePen and JSFiddle
- Built with modern web technologies
- Icons from Lucide React
- Styling with Tailwind CSS

---

**Happy Coding! 🚀**

---
*Last updated: $(Get-Date)* 
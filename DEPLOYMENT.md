# 🚀 Deployment Guide

## Quick Start

Your Live CSS Playground is now ready for deployment! Here are your options:

## 1. GitHub Pages (Recommended)

### Automatic Deployment
The app is already configured with GitHub Actions for automatic deployment:

1. **Push to GitHub**: When you push to the `main` or `master` branch, it will automatically deploy
2. **Enable GitHub Pages**: 
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
3. **Access your app**: It will be available at `https://yourusername.github.io/your-repo-name`

### Manual GitHub Pages
If you prefer manual deployment:
```bash
npm run build
# Then upload the dist folder to GitHub Pages
```

## 2. Vercel (Easiest)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** and your app will be live!

## 3. Netlify

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Your app is live!

## 4. Local Production Testing

To test the production build locally:

```bash
npm run build
npm run serve
```

Then visit `http://localhost:3000`

## 5. Other Platforms

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Surge.sh
```bash
npm install -g surge
npm run build
surge dist
```

## Troubleshooting

### Build Issues
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run lint`
- Clear cache: `rm -rf node_modules && npm install`

### Deployment Issues
- Ensure the `dist` folder is generated after build
- Check that all assets are properly referenced
- Verify the base URL in `vite.config.ts` if needed

## Environment Variables

If you need to configure environment variables:

1. **Development**: Create a `.env` file
2. **Production**: Set them in your hosting platform's dashboard

## Custom Domain

Most platforms support custom domains:
- **Vercel**: Add domain in dashboard
- **Netlify**: Configure in site settings
- **GitHub Pages**: Add CNAME file to repository

---

**Your Live CSS Playground is ready to go live! 🎉** 
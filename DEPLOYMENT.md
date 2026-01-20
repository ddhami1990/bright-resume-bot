# GitHub Pages Deployment Guide

## Quick Setup

1. **Push your code to GitHub** with repository name `bright-resume-bot`

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - Save

3. **Automatic deployment** will happen on next push to `main` branch

4. **Your site will be live** at: `https://[your-username].github.io/bright-resume-bot`

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (18+ recommended)
- Check build logs in Actions tab

### Page Shows 404
- Wait 2-3 minutes after deployment
- Check that repository name matches the `base` path in `vite.config.ts`
- Ensure you're using the correct URL format

### Assets Not Loading
- Check that `base: '/bright-resume-bot/'` in `vite.config.ts` matches your repo name
- Clear browser cache and try incognito mode

### Manual Deployment

If automatic deployment fails, you can deploy manually:

```bash
# Install dependencies
npm install

# Build project
npm run build

# Deploy (install gh-pages first if needed)
npm install -g gh-pages
gh-pages -d dist
```

## Repository Settings Checklist

- ✅ Repository is public (required for free GitHub Pages)
- ✅ Branch protection allows GitHub Actions
- ✅ Repository name: `bright-resume-bot`
- ✅ Default branch: `main`

## Common Issues

**Issue**: "Repository not found" in Actions
**Fix**: Ensure repository name exactly matches `bright-resume-bot`

**Issue**: "Build fails with permission errors"
**Fix**: Check that Actions has read/write permissions in repository settings

**Issue**: "Page not found" after deployment
**Fix**: Wait 5-10 minutes, then check the Actions logs for the exact deployment URL

## Lovable Deployment Troubleshooting

### Common Lovable Build Errors:

1. **`lovable-tagger` plugin error:**
   - ✅ **Fixed**: Removed `lovable-tagger` plugin from `vite.config.ts`
   - ✅ **Fixed**: Removed dependency from `package.json`

2. **Build timeout or failure:**
   - Reduce bundle size by checking for large unused dependencies
   - Ensure all imports are resolvable
   - Check for Node.js specific code that won't work in browser

3. **Environment compatibility:**
   - Some packages might not work in Lovable's sandbox environment
   - Check Lovable documentation for supported packages
   - Avoid server-side rendering or Node.js APIs

### Lovable-Specific Fixes:

- ✅ **Base path**: Set to `'/'` for all deployments
- ✅ **Clean config**: Removed custom plugins that might conflict
- ✅ **Test locally**: `npm run build && npm run preview`

### If Lovable Still Fails:

Try these alternatives:
- **Netlify**: Drag & drop the `dist` folder
- **Vercel**: Connect GitHub repo directly
- **GitHub Pages**: Use the workflow already configured

### Testing Your Build:

```bash
# Build locally
npm run build

# Test the build
npm run preview

# Should work at http://localhost:4173
```
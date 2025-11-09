# Deployment Guide - Vercel

## 🚀 Deploy to Vercel (Recommended)

### Method 1: Vercel Dashboard (Easiest)

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `Juan-Cwq/photo_app`
   - Click "Import"

3. **Configure**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at: `https://your-project.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd "/Users/jcors09/Library/Mobile Documents/com~apple~CloudDocs/Cascade_Projects/photo filter"
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `photo-filter-app` (or your choice)
   - Directory? `./`
   - Override settings? **N**

5. **Production deploy**:
   ```bash
   vercel --prod
   ```

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Webcam permission prompt appears
- [ ] All filters work correctly
- [ ] Side-by-side preview toggles properly
- [ ] Gaussian blur sliders adjust in real-time
- [ ] Download button saves images
- [ ] Mobile responsive design works

## 🔧 Environment Variables

No environment variables needed! All processing is client-side.

## 🌐 Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📊 Performance Tips

- Vercel automatically optimizes images and assets
- Next.js uses automatic code splitting
- All filters run client-side (no server load)
- CDN distribution worldwide

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Webcam Not Working

- Ensure site is accessed via HTTPS (Vercel provides this automatically)
- Check browser permissions
- Try different browser (Chrome/Edge recommended)

### Filters Not Applying

- Check browser console for errors
- Ensure Canvas API is supported
- Try clearing browser cache

## 📱 Testing Locally Before Deploy

```bash
# Development mode
npm run dev

# Production build locally
npm run build
npm start
```

## 🔄 Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## 📈 Monitoring

View deployment logs and analytics:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. View "Deployments" and "Analytics" tabs

---

## 🎉 You're Done!

Your photo filter app is now live and accessible worldwide!

**Next Steps**:
- Share your deployment URL
- Add custom domain (optional)
- Monitor usage in Vercel dashboard
- Update filters and redeploy automatically

# Deployment Guide to Vercel

## Quick Deploy (Recommended)

### Method 1: Deploy via GitHub (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy (first time - preview):**
   ```bash
   vercel
   ```

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Method 3: Deploy via Vercel Dashboard (Drag & Drop)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Click "Browse" and select your project folder
4. Vercel will auto-detect Next.js
5. Click "Deploy"

## Build Settings (Auto-detected)

Vercel will automatically detect:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node Version:** Latest LTS (20.x)

## Important Notes

### Data Persistence ⚠️

**Current Setup:** The app uses an in-memory data store. This means:
- Data resets on server restarts
- Data resets on cold starts (after inactivity)
- Each serverless function instance has separate data

**For Production:** You'll need to connect to a database. Recommended options:
- **Vercel Postgres** (integrated with Vercel)
- **Supabase** (free tier available)
- **MongoDB Atlas** (free tier available)
- **PlanetScale** (MySQL, free tier available)

### Environment Variables

If you add environment variables later (e.g., database connection strings):
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add your variables
4. Redeploy

## Troubleshooting

### Build Fails
- Make sure all dependencies are in `package.json`
- Check that TypeScript errors are resolved
- Verify Node.js version compatibility

### Data Not Persisting
- This is expected with in-memory store
- Consider adding a database (see above)

### API Routes Not Working
- Ensure API routes are in `/app/api/` directory
- Check Vercel function logs in dashboard

## Next Steps After Deployment

1. ✅ Your app is live!
2. 🔗 Share the Vercel URL with your team
3. 🔒 Add authentication (optional)
4. 💾 Connect to a database for persistence
5. 📊 Set up analytics (optional)
6. 🚀 Enable preview deployments for branches

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

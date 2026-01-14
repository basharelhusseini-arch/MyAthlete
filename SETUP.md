# Thrivv MVP Setup Guide

This guide will help you set up Thrivv with persistent data using Supabase (Postgres).

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- Git

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in:
   - **Name**: Thrivv
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to you
4. Wait 2-3 minutes for project to be created

## 2. Run Database Migration

1. **Open locally**: Open the file `supabase/migrations/001_initial_schema.sql` in your code editor
2. **Copy all SQL**: Select all contents (Cmd/Ctrl + A) and copy (Cmd/Ctrl + C)
3. **Go to Supabase**: In your Supabase project dashboard, click **SQL Editor** in the left sidebar
4. **New query**: Click the **"New query"** button
5. **Paste SQL**: Paste the copied SQL into the editor (Cmd/Ctrl + V)
6. **Run**: Click the green **"Run"** button (or press Cmd/Ctrl + Enter)
7. **Verify**: You should see **"Success. No rows returned"** - this is correct!
8. **Check tables**: Go to **Table Editor** (left sidebar) → you should see 3 tables: `users`, `daily_checkins`, `health_scores`

## 3. Get Your Supabase Credentials

1. In Supabase, go to **Settings** → **API** (left sidebar)
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Project API keys**:
     - `anon` `public` key
     - `service_role` key (click "Reveal" to see it)

## 4. Set Up Environment Variables

### Local Development

1. Create a file named `.env.local` in the project root
2. Add the following (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_random_32_character_secret_minimum
NODE_ENV=development
```

3. Generate a secure JWT_SECRET:
```bash
# On macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Vercel Deployment

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add each variable from above:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
   - `NODE_ENV` = `production`
3. Make sure to select "Production", "Preview", and "Development" for each
4. Redeploy your project

## 5. Install Dependencies

```bash
npm install
```

This will install:
- `@supabase/supabase-js` - Supabase client
- `bcryptjs` - Password hashing
- `jose` - JWT tokens for sessions

## 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 7. Test the MVP Flow

### Test Checklist

#### ✅ Sign Up
1. Go to homepage → Click "Sign Up Free"
2. Fill in:
   - First Name: John
   - Last Name: Doe
   - Email: john@test.com
   - Phone: 555-1234
   - Password: testpass123 (min 6 chars)
   - Confirm Password: testpass123
3. Click "Create Account"
4. Should redirect to dashboard automatically (auto-login)
5. **Verify in Supabase**: Go to Table Editor → `users` → should see new user

#### ✅ Logout
1. Click "Sign Out" in sidebar
2. Should redirect to homepage
3. Try to access /member/dashboard → should redirect to login

#### ✅ Login
1. Go to homepage → Click "Sign In"
2. Enter email: john@test.com
3. Enter password: testpass123
4. Click "Login"
5. Should redirect to dashboard

#### ✅ Daily Check-In
1. From dashboard, click "Complete Check-In" or go to sidebar → (add Check-In link)
2. Or navigate to `/member/checkin`
3. Fill in:
   - ✓ I worked out today (checked)
   - Calories: 2200
   - Sleep Hours: 7.5
   - Notes: Felt great today!
4. Click "Complete Check-In"
5. Should see success message and health score
6. **Verify in Supabase**: 
   - Table Editor → `daily_checkins` → should see today's entry
   - Table Editor → `health_scores` → should see today's score (around 100!)

#### ✅ Data Persistence
1. Close browser completely
2. Reopen and go to http://localhost:3000/member/dashboard
3. Should be logged out (session expired or cleared)
4. Log in again
5. Check-in data should still be visible
6. Go to `/member/checkin` → should show your previous check-in values

#### ✅ Health Score Updates
1. Go to `/member/checkin` again
2. Uncheck "I worked out today"
3. Change calories to 2800 (over target)
4. Change sleep to 5 (under optimal)
5. Click "Update Check-In"
6. Score should decrease (around 50-60 points)
7. **Verify in Supabase**: `health_scores` → today's entry should be updated

#### ✅ Leaderboard
1. Create 2-3 more test accounts (different browsers or incognito mode)
2. Complete check-ins with different scores
3. Go to `/member/dashboard` → should see leaderboard
4. Users should be ranked by today's score
5. Current user should be highlighted

## 8. Database Schema

### Tables Created

- **users**: User accounts with hashed passwords
- **daily_checkins**: Daily workout/diet/sleep data
- **health_scores**: Calculated health scores (0-100)
- **friends**: For future friend features

### Health Score Algorithm (MVP v1)

- **Training**: 30 points (did workout = 30, didn't = 0)
- **Diet**: 40 points (based on 2200 ± 300 calorie target)
- **Sleep**: 30 points (optimal 7-9 hours = 30, less/more = reduced)
- **Total**: Sum of all three (capped at 100)

## 9. API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account + auto-login
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Clear session
- `GET /api/auth/me` - Get current user

### Check-ins & Scores
- `POST /api/checkin/today` - Submit/update today's check-in
- `GET /api/checkin/today` - Get today's check-in
- `GET /api/score/today` - Get today's health score
- `GET /api/score/history?days=14` - Get score history
- `GET /api/leaderboard?days=1` - Get leaderboard

## 10. Security Features

✅ **Passwords**: Hashed with bcrypt (cost factor 12)
✅ **Sessions**: JWT tokens in httpOnly cookies (7-day expiry)
✅ **No localStorage**: Auth data never exposed to JavaScript
✅ **SQL Injection**: Protected via Supabase parameterized queries
✅ **CORS**: Next.js handles same-origin by default

## 11. Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and has all required vars
- Restart dev server after adding env vars

### "Failed to create account" / Database errors
- Check Supabase SQL Editor → run migration again
- Verify service_role key is correct
- Check Supabase project isn't paused (free tier auto-pauses after 7 days inactivity)

### "Unauthorized" errors
- Clear cookies and log in again
- Check JWT_SECRET is the same between restarts
- Verify cookie is being set (check browser DevTools → Application → Cookies)

### Build errors in Vercel
- Ensure all env vars are set in Vercel dashboard
- Make sure NODE_ENV=production for production deploy
- Check build logs for specific TypeScript errors

## 12. Next Steps (Post-MVP)

- [ ] Add "Check-In" link to sidebar navigation
- [ ] Update dashboard to show check-in status and scores from DB
- [ ] Add score trend charts (7-day history)
- [ ] Implement friends system
- [ ] Add wearable integrations (Whoop, Garmin, Apple Health)
- [ ] User profile settings (calorie targets, goals)
- [ ] Password reset flow
- [ ] Email notifications
- [ ] Mobile responsive improvements
- [ ] Analytics and insights

## Support

If you run into issues:
1. Check Supabase logs: Project → Logs
2. Check browser console for errors
3. Check terminal/Vercel logs for API errors
4. Verify all env vars are set correctly

---

**You now have a fully functional MVP with real database persistence!** 🎉

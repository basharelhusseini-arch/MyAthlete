# Thrivv MVP - Quick Start

## 🚀 Get Up and Running in 30 Minutes

Your Thrivv MVP is ready! Follow these steps to get it live with real database persistence.

### Step 1: Supabase Setup (10 min)

1. **Create account**: https://supabase.com
2. **New Project**: Name it "Thrivv", generate password
3. **Run migration**: Go to SQL Editor, paste contents of `supabase/migrations/001_initial_schema.sql`, click Run
4. **Get credentials**: Settings → API → copy URL and both API keys

### Step 2: Environment Variables (5 min)

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=generate_random_32_char_string
NODE_ENV=development
```

Generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 3: Install & Run (5 min)

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Step 4: Test (10 min)

1. **Sign up**: Click "Sign Up Free" → create account
2. **Check-in**: Go to http://localhost:3000/member/checkin
   - Check "I worked out today"
   - Enter calories: 2200
   - Enter sleep: 7.5
   - Submit
3. **Verify**: Close browser, reopen, log in → data persists!
4. **Supabase**: Check Table Editor → see your data in DB

### Step 5: Deploy to Vercel (5 min)

1. Push code to GitHub
2. Import to Vercel
3. Add same env vars in Vercel dashboard
4. Deploy!

---

## 📖 Full Documentation

- **Detailed Setup**: See `SETUP.md`
- **Implementation Summary**: See `MVP_SUMMARY.md`
- **Test Checklist**: In `SETUP.md`

## ✅ What Works Now

- ✅ Real user accounts (Postgres)
- ✅ Secure authentication (bcrypt + JWT)
- ✅ Daily check-ins (workout/diet/sleep)
- ✅ Health score calculation (0-100)
- ✅ Data persistence across sessions
- ✅ Leaderboard (global rankings)

## 🎯 Core MVP Loop

```
Sign Up → Log In → Daily Check-In → Health Score Updates → Data Persists Forever
```

---

Need help? Check `SETUP.md` for troubleshooting!

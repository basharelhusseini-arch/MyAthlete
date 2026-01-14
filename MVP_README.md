# Thrivv MVP - Quick Start Guide

**Transform your health into a competitive game.** Track workouts, nutrition, and sleep. Compete with friends on the leaderboard. Win with consistency.

---

## 🚀 Quick Start (5 minutes)

### 1. Clone & Install
```bash
git clone <your-repo>
cd Project
npm install
```

### 2. Setup Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to **SQL Editor** → copy contents of `supabase/migrations/001_initial_schema.sql` → run
4. Go to **Project Settings > API** → copy URL and service_role key

### 3. Configure Environment
```bash
# Create .env.local file
cp .env.example .env.local

# Add your keys:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
JWT_SECRET=$(openssl rand -base64 32)
```

### 4. Run
```bash
npm run dev
```

Visit http://localhost:3000

---

## ✅ Test the MVP (2 minutes)

1. **Signup**: http://localhost:3000/member/signup
   - Create an account (use any email, no verification needed)

2. **Login**: http://localhost:3000/member/login
   - Login with your credentials

3. **Check-in**: http://localhost:3000/member/checkin
   - Did you workout? ✓ Yes
   - Calories: 2200
   - Sleep hours: 8
   - Submit

4. **Dashboard**: http://localhost:3000/member/dashboard
   - See your health score (should be 100!)
   - Check the leaderboard

5. **Refresh**: Hit F5
   - Data persists ✅

---

## 📦 What's Included

### Features
- ✅ **Secure Authentication**: bcrypt + JWT + httpOnly cookies
- ✅ **Daily Check-ins**: Track workout, calories, sleep
- ✅ **Health Score**: Calculated from your daily inputs (max 100 points)
- ✅ **Global Leaderboard**: Compete with other users
- ✅ **Persistent Data**: Postgres database via Supabase
- ✅ **Real-time Updates**: Dashboard shows live data

### Pages
- `/member/signup` - User registration
- `/member/login` - Secure login
- `/member/dashboard` - Your health overview
- `/member/checkin` - Daily check-in form

### API Endpoints
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user
- `POST /api/checkin/today` - Submit check-in
- `GET /api/score/today` - Get today's score
- `GET /api/score/history?days=7` - Score history
- `GET /api/leaderboard` - Top 10 users

---

## 📊 Health Score Breakdown

**Max Score: 100 points**

| Component | Max Points | How to Score |
|-----------|------------|--------------|
| **Training** | 30 | Did you workout today? |
| **Diet** | 40 | Calories within ±100 of target (2200) |
| **Sleep** | 30 | 7.5-8.5 hours of sleep |

**Examples**:
- Perfect day: Workout ✓, 2200 cal, 8h sleep = **100 points** 🏆
- No workout: No workout, 2200 cal, 8h sleep = **70 points**
- Bad diet: Workout ✓, 3000 cal, 8h sleep = **60 points**

---

## 🔒 Security

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ Sessions stored in httpOnly cookies (XSS protected)
- ✅ JWT tokens signed with secret key
- ✅ Server-side session validation
- ✅ No auth tokens in localStorage
- ✅ Secure cookies in production (HTTPS only)

---

## 📁 Project Structure

```
Project/
├── supabase/migrations/     # Database schema
├── lib/                     # Utilities (auth, supabase, health-score)
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── checkin/         # Check-in endpoints
│   │   ├── score/           # Score endpoints
│   │   └── leaderboard/     # Leaderboard endpoint
│   └── member/              # Member pages (signup, login, dashboard, checkin)
├── SETUP.md                 # Detailed setup guide
├── TEST_CHECKLIST.md        # Comprehensive testing guide
├── MVP_IMPLEMENTATION_SUMMARY.md  # Complete implementation overview
└── CHANGES.md               # All changes made for MVP
```

---

## 🚢 Deploy to Production

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY
# - JWT_SECRET
```

### Environment Variables
Set these in Vercel dashboard or `.env.production`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-key
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

---

## 🧪 Testing

See `TEST_CHECKLIST.md` for comprehensive testing guide with:
- 10 test scenarios
- API endpoint examples (curl commands)
- Edge case testing
- Production readiness checklist

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `SETUP.md` | Complete setup instructions |
| `TEST_CHECKLIST.md` | Testing guide with 10+ scenarios |
| `MVP_IMPLEMENTATION_SUMMARY.md` | Technical overview and architecture |
| `CHANGES.md` | All changes made for MVP |
| `MVP_README.md` | This file (quick start) |

---

## 🐛 Troubleshooting

**"Missing Supabase environment variables"**
→ Check `.env.local` exists with `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

**"Failed to create account"**
→ Verify database tables exist in Supabase (run migration SQL)

**Session expires immediately**
→ Ensure `JWT_SECRET` is set in `.env.local`

**Leaderboard is empty**
→ Complete at least one check-in to appear

**More issues?** See `TEST_CHECKLIST.md` troubleshooting section.

---

## 🎯 Success Criteria

Your MVP is working if:
- ✅ You can signup and login
- ✅ You can complete a daily check-in
- ✅ Your health score appears on dashboard
- ✅ You appear on the leaderboard
- ✅ Data persists after browser refresh
- ✅ No console errors on happy path

---

## 🔮 Future Features (Not in MVP)

- Email verification
- Password reset
- Profile editing
- Friends system
- Personalized calorie targets
- Wearable device integration (Whoop, Garmin, Apple Health)
- Achievements and badges
- Streak tracking
- Mobile app

---

## 📊 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: Supabase (Postgres)
- **Auth**: bcrypt, jose (JWT), cookies
- **Deployment**: Vercel

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

[Your License Here]

---

## 🙋‍♂️ Support

- **Setup Issues**: See `SETUP.md`
- **Testing**: See `TEST_CHECKLIST.md`
- **Technical Details**: See `MVP_IMPLEMENTATION_SUMMARY.md`
- **Bug Reports**: Open an issue on GitHub

---

**Made with 💪 by the Thrivv Team**

**Last Updated**: January 14, 2026

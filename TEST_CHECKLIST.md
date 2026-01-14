# Thrivv MVP Test Checklist

This document provides a complete testing guide for the Thrivv MVP implementation.

## Pre-Testing Setup

### 1. Environment Variables
Ensure all environment variables are set in `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-jwt-secret-here

# Node Environment
NODE_ENV=development
```

### 2. Database Setup
1. Open Supabase SQL Editor
2. Copy contents from `supabase/migrations/001_initial_schema.sql`
3. Paste and run in SQL Editor
4. Verify tables exist in Table Editor:
   - `users`
   - `daily_checkins`
   - `health_scores`

### 3. Start Development Server
```bash
npm install
npm run dev
```

Visit http://localhost:3000

---

## Test Scenarios

### ✅ Test 1: User Signup

**Objective**: Create a new user account with persistent storage.

**Steps**:
1. Navigate to http://localhost:3000/member/signup
2. Fill out the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john.doe@example.com`
   - Phone: `555-1234`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Create Account"

**Expected Results**:
- ✅ Redirected to `/member/dashboard`
- ✅ Welcome message shows user's email prefix
- ✅ Session cookie is set (check browser DevTools > Application > Cookies)
- ✅ User record exists in Supabase `users` table
- ✅ No localStorage usage for auth tokens

**Verification in Supabase**:
```sql
SELECT * FROM users WHERE email = 'john.doe@example.com';
```

---

### ✅ Test 2: User Login

**Objective**: Log in with existing credentials.

**Steps**:
1. Log out if logged in (click "Logout" button)
2. Navigate to http://localhost:3000/member/login
3. Enter credentials:
   - Email: `john.doe@example.com`
   - Password: `password123`
4. Click "Sign In"

**Expected Results**:
- ✅ Redirected to `/member/dashboard`
- ✅ Session cookie is set
- ✅ Dashboard shows user data
- ✅ Health score shows "No score yet" (if no check-in)
- ✅ Alert banner: "Complete Today's Check-in"

**Error Case**: Try wrong password
- ✅ Should show "Invalid credentials" error

---

### ✅ Test 3: Daily Check-in

**Objective**: Log daily health data and calculate health score.

**Steps**:
1. From dashboard, click "Check In" button (yellow banner or card)
2. Fill out the form:
   - Did you workout today? `Yes` (checked)
   - Calories consumed: `2200`
   - Hours of sleep: `8`
3. Click "Save Check-in"

**Expected Results**:
- ✅ Success message: "Check-in saved successfully!"
- ✅ Redirected back to dashboard
- ✅ Health score is now displayed (should be ~100)
  - Training: 30/30 (workout completed)
  - Diet: 40/40 (calories within target ±100)
  - Sleep: 30/30 (8 hours optimal)
- ✅ Check-in alert banner disappears
- ✅ User appears on leaderboard

**Verification in Supabase**:
```sql
-- Check daily check-in record
SELECT * FROM daily_checkins WHERE user_id = (
  SELECT id FROM users WHERE email = 'john.doe@example.com'
) ORDER BY date DESC LIMIT 1;

-- Check health score record
SELECT * FROM health_scores WHERE user_id = (
  SELECT id FROM users WHERE email = 'john.doe@example.com'
) ORDER BY date DESC LIMIT 1;
```

---

### ✅ Test 4: Health Score Calculation

**Objective**: Verify health score algorithm works correctly.

**Test Cases**:

#### Case A: Perfect Score
- Workout: Yes
- Calories: 2200 (target)
- Sleep: 8 hours
- **Expected Score**: 100 (30 + 40 + 30)

#### Case B: No Workout
- Workout: No
- Calories: 2200
- Sleep: 8 hours
- **Expected Score**: 70 (0 + 40 + 30)

#### Case C: Poor Diet
- Workout: Yes
- Calories: 3000 (too high, deviation >500)
- Sleep: 8 hours
- **Expected Score**: 60 (30 + 0 + 30)

#### Case D: Low Sleep
- Workout: Yes
- Calories: 2200
- Sleep: 5 hours (too low)
- **Expected Score**: 70 (30 + 40 + 0)

**Steps**: Submit check-in with each case and verify score matches expected.

---

### ✅ Test 5: Data Persistence After Refresh

**Objective**: Ensure data persists across sessions.

**Steps**:
1. Complete a check-in (Test 3)
2. Note your health score
3. Close browser completely
4. Reopen and navigate to http://localhost:3000/member/dashboard

**Expected Results**:
- ✅ Still logged in (session cookie persists)
- ✅ Health score is the same as before
- ✅ Check-in alert banner does NOT appear (already completed today)
- ✅ Score history shows previous data

---

### ✅ Test 6: Logout and Session Clearing

**Objective**: Verify logout clears session.

**Steps**:
1. From dashboard, click "Logout" button
2. Try to access http://localhost:3000/member/dashboard directly

**Expected Results**:
- ✅ Redirected to `/member/login`
- ✅ Session cookie is cleared
- ✅ Cannot access protected routes without login

---

### ✅ Test 7: Leaderboard

**Objective**: Global leaderboard shows users ranked by health score.

**Setup**:
1. Create 3 test users with different scores:
   - User A: Score 100
   - User B: Score 80
   - User C: Score 60

**Steps**:
1. Log in as each user
2. Complete check-ins with different data to achieve target scores
3. View dashboard leaderboard

**Expected Results**:
- ✅ Leaderboard shows all users ranked by score (highest first)
- ✅ Medals displayed: 🥇 1st, 🥈 2nd, 🥉 3rd
- ✅ Current user is highlighted with "You" badge
- ✅ Score colors match thresholds:
  - 90+: Green
  - 80-89: Blue
  - 70-79: Yellow
  - 60-69: Orange
  - <60: Red

---

### ✅ Test 8: Score History

**Objective**: Track health scores over multiple days.

**Steps**:
1. Complete check-ins on multiple days
   - (For testing, you can manually insert records with different dates in Supabase)
2. View dashboard

**Expected Results**:
- ✅ "7-Day Trend" card shows colored bars for each day
- ✅ "Recent Health Scores" section lists all scores with dates
- ✅ Each score shows breakdown (training, diet, sleep)

**Manual Test Data (SQL)**:
```sql
-- Insert test check-ins for past 5 days
INSERT INTO daily_checkins (user_id, date, did_workout, calories, sleep_hours)
SELECT 
  (SELECT id FROM users WHERE email = 'john.doe@example.com'),
  CURRENT_DATE - INTERVAL '1 day' * generate_series,
  (generate_series % 2 = 0), -- alternate workout days
  2200 + (generate_series * 100), -- varying calories
  7 + (generate_series * 0.5) -- varying sleep
FROM generate_series(1, 5);

-- Calculate and insert corresponding health scores
-- (Run through /api/checkin/today for each date, or calculate manually)
```

---

### ✅ Test 9: Update Existing Check-in

**Objective**: Users can update check-in for the same day.

**Steps**:
1. Complete a check-in with:
   - Workout: Yes
   - Calories: 2200
   - Sleep: 8
2. Navigate back to `/member/checkin`
3. Form should be pre-filled with today's data
4. Change calories to 2500
5. Submit

**Expected Results**:
- ✅ Form pre-loads with existing data
- ✅ Update succeeds
- ✅ Health score recalculates
- ✅ Only one record per user per day in database

---

### ✅ Test 10: Authentication Edge Cases

**Test Cases**:

#### A. Duplicate Email
1. Try to signup with existing email
2. **Expected**: "Email already registered" error

#### B. Weak Password
1. Try to signup with password < 6 characters
2. **Expected**: "Password must be at least 6 characters" error

#### C. Password Mismatch
1. Signup with different password and confirm password
2. **Expected**: "Passwords do not match" error

#### D. Protected Routes
1. Log out
2. Try to access:
   - `/member/dashboard`
   - `/member/checkin`
3. **Expected**: Redirected to `/member/login`

---

## API Endpoint Tests

Use curl or Postman to test API endpoints directly.

### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

### Check Auth
```bash
curl http://localhost:3000/api/auth/me \
  -b cookies.txt
```

### Submit Check-in
```bash
curl -X POST http://localhost:3000/api/checkin/today \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "didWorkout": true,
    "calories": 2200,
    "sleepHours": 8
  }'
```

### Get Today's Score
```bash
curl http://localhost:3000/api/score/today \
  -b cookies.txt
```

### Get Score History
```bash
curl http://localhost:3000/api/score/history?days=7 \
  -b cookies.txt
```

### Get Leaderboard
```bash
curl http://localhost:3000/api/leaderboard
```

---

## Production Readiness Checks

### Security
- ✅ Passwords are hashed with bcrypt (12 rounds)
- ✅ JWTs are signed with secret key
- ✅ Session cookies are httpOnly (not accessible via JavaScript)
- ✅ Session cookies are secure in production (HTTPS only)
- ✅ No sensitive data stored in localStorage
- ✅ Password fields use `type="password"`

### Database
- ✅ Foreign key constraints in place
- ✅ Unique constraints on (user_id, date) for check-ins and scores
- ✅ Indexes on frequently queried columns
- ✅ CASCADE delete for user-related data

### Environment Variables
- ✅ `.env.local` in .gitignore
- ✅ Sample `.env.example` provided
- ✅ JWT_SECRET is strong (32+ bytes)
- ✅ Supabase service key is not exposed to client

### Performance
- ✅ Database queries use indexes
- ✅ Leaderboard limited to top 10
- ✅ Score history limited by days parameter

---

## Known Limitations (MVP Scope)

- **No email verification** (can be added later)
- **No password reset flow** (can be added later)
- **No profile editing** (name, email, password changes)
- **No friends system** (leaderboard is global only)
- **No personalized calorie targets** (uses default 2200)
- **No data export/import**
- **No admin panel**
- **No mobile app** (web only)

---

## Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Verify `.env.local` exists with correct keys.

### Issue: "Failed to create account"
**Solution**: Check Supabase logs for errors. Ensure database migration ran successfully.

### Issue: Session expires too quickly
**Solution**: Check JWT expiration time in `lib/auth.ts` (default: 7 days).

### Issue: Health score not calculating
**Solution**: Check `/api/checkin/today` response for errors. Verify `lib/health-score.ts` logic.

### Issue: Leaderboard empty
**Solution**: Ensure at least one user has completed a check-in for today.

---

## Success Criteria

**MVP is complete when**:
- ✅ New users can sign up and log in
- ✅ Users can complete daily check-ins
- ✅ Health scores are calculated correctly
- ✅ Data persists across browser refresh
- ✅ Leaderboard shows ranked users
- ✅ All security best practices are followed
- ✅ No console errors on happy path
- ✅ Deployable to Vercel with environment variables

---

**Last Updated**: January 14, 2026

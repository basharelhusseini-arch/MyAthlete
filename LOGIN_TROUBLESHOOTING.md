# Login "Invalid Email or Password" - Troubleshooting Guide

## 🎯 Quick Fix (Most Common Issue)

### Problem: Email Confirmation is Enabled in Supabase

**Solution: Disable it for testing**

1. **Go to Supabase Dashboard:**
   - Visit: https://app.supabase.com
   - Select your project

2. **Navigate to Auth Settings:**
   - Click **Authentication** in left sidebar
   - Click **Settings** (or **Providers** tab)
   - Scroll to find **"Enable email confirmations"**

3. **Disable Email Confirmation:**
   - Toggle it **OFF** (should be gray/disabled)
   - Scroll to bottom and click **Save**

4. **Sign Up a New Test User:**
   - Go to: http://localhost:3000/member/signup
   - Fill in:
     - First Name: `Test`
     - Last Name: `User`
     - Email: `test@example.com`
     - Phone: `1234567890`
     - Password: `password123`
   - Click **Create Account**
   - Should redirect to dashboard immediately

5. **Test Logout & Login:**
   - Click **Sign Out** in sidebar
   - Go to: http://localhost:3000/member/login
   - Enter:
     - Email: `test@example.com`
     - Password: `password123`
   - Click **Login**
   - ✅ Should work now!

---

## 🔍 Alternative Troubleshooting

### Check 1: Verify User Exists in Supabase

1. Go to Supabase Dashboard
2. Click **Authentication** → **Users**
3. Look for your email in the list

**If your email is NOT there:**
- You haven't signed up yet
- Go to `/member/signup` and create an account first

**If your email IS there:**
- Check the "Email Confirmed" column
- If not confirmed and confirmation is required, you can't log in
- Solution: Disable email confirmation (see above)

---

### Check 2: Verify Credentials

- Are you using the exact email you signed up with?
- Is the password correct? (case-sensitive)
- Try signing up with a completely NEW email to test

---

### Check 3: Check Browser Console for Errors

1. Open your browser DevTools (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Try logging in
4. Look for red error messages
5. Common errors:
   - `"Invalid login credentials"` → Wrong email/password or user doesn't exist
   - `"Email not confirmed"` → Email confirmation is required
   - `"Configuration error"` → Environment variables issue

---

### Check 4: Verify Environment Variables

Your `.env.local` file should have:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
JWT_SECRET=your-secret-jwt-key
```

**To check (without exposing secrets):**
```bash
cat .env.local | grep SUPABASE_URL
```

Should show your actual Supabase URL, not "PASTE_YOUR_URL_HERE"

---

## 🧪 Test Sequence

Follow this exact sequence to test:

### Step 1: Disable Email Confirmation
- [ ] Go to Supabase Dashboard
- [ ] Authentication → Settings
- [ ] Toggle OFF "Enable email confirmations"
- [ ] Click Save

### Step 2: Clear Old Test Data (Optional)
- [ ] Go to Supabase Dashboard → Authentication → Users
- [ ] Delete any test users if you want to start fresh

### Step 3: Test Signup
- [ ] Go to http://localhost:3000/member/signup
- [ ] Sign up with: `test@example.com` / `password123`
- [ ] Should redirect to dashboard immediately
- [ ] Should see sidebar with "Test User"

### Step 4: Test Logout
- [ ] Click "Sign Out" button in sidebar
- [ ] Should redirect to login page

### Step 5: Test Login
- [ ] Go to http://localhost:3000/member/login
- [ ] Enter: `test@example.com` / `password123`
- [ ] Click "Login"
- [ ] Should redirect to dashboard
- [ ] ✅ **WORKING!**

---

## 🚨 If Still Not Working

### Verify Supabase Auth is Working

You can test Supabase Auth directly in the Supabase SQL Editor:

```sql
-- Check if auth is enabled
SELECT * FROM auth.users LIMIT 5;
```

If you get an error, your auth schema might not be set up.

### Check API Response

Open browser DevTools → Network tab:
1. Try to log in
2. Find the `/api/auth/login` request
3. Click on it
4. Check the **Response** tab
5. Look for the actual error message

Common responses:
- `"Invalid login credentials"` → User doesn't exist or wrong password
- `"Email not confirmed"` → Confirmation required
- `"Configuration error"` → Missing env vars

### Enable Debug Logging

The login API already logs errors. Check your terminal where `npm run dev` is running:

```bash
# Look for logs like:
Supabase Auth login error: {
  message: '...',
  status: ...,
  code: '...'
}
```

This will show the exact error from Supabase.

---

## 📞 Need More Help?

If you've tried everything above and it still doesn't work, provide:

1. ✅ or ❌ Email confirmation is OFF in Supabase
2. ✅ or ❌ User exists in Supabase Users table
3. ✅ or ❌ Email is "Confirmed" in Supabase
4. ✅ or ❌ `.env.local` has real Supabase values
5. What error you see in browser console
6. What error you see in terminal (where dev server runs)

---

## 💡 Why This Happens

**Supabase Auth** requires:
1. **User must exist** in `auth.users` table (created via signup)
2. **Email must be confirmed** (if confirmation is enabled)
3. **Password must match** the one set during signup

When you sign up:
- With confirmation **OFF**: Can log in immediately
- With confirmation **ON**: Must click email link first

The error "Invalid email or password" is a generic message that covers:
- User doesn't exist
- Wrong password
- Email not confirmed
- Account disabled

**Solution:** Always disable email confirmation for local development/testing.

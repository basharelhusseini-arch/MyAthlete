# Environment Variable Setup - Complete Guide

## 🚨 Original Problem

**Symptom:** Signup (and other features) failed silently with "Failed to create account" or showed no error at all.

**Root Cause:** 
```
NEXT_PUBLIC_SUPABASE_URL was missing at runtime
```

**Why it happened:**
1. ❌ No `.env.example` template for developers
2. ❌ No centralized validation of environment variables
3. ❌ Variables accessed directly via `process.env.*` (returns `string | undefined`)
4. ❌ Generic error messages hid the real problem
5. ❌ Build succeeded even without env vars (silent failure)

---

## ✅ Solution Applied

### **1. Created Environment Template** (`.env.example`)

**Purpose:** Provides a template for developers to copy and fill in.

**Location:** `/Users/basharhusseini/Project/.env.example`

**Contents:**
- All required Supabase environment variables
- Clear comments explaining where to get each value
- Instructions for local setup and production deployment

**Usage:**
```bash
# Copy template to create your local env file
cp .env.example .env.local

# Fill in your actual Supabase credentials
# Get them from: Supabase Dashboard → Project Settings → API
```

---

### **2. Created Centralized Environment Helper** (`lib/env.ts`)

**Purpose:** Single source of truth for environment variable access with validation.

**What it does:**
- ✅ Validates required environment variables exist
- ✅ Provides type-safe access (returns `string`, not `string | undefined`)
- ✅ Throws clear, actionable errors if variables are missing
- ✅ Includes helpful instructions in error messages
- ✅ Prevents silent failures

**Functions:**

#### `getSupabaseEnv()`
Returns validated Supabase URL and anon key.

```typescript
const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();
// TypeScript knows these are strings, not string | undefined ✅
```

**Error example:**
```
❌ Missing NEXT_PUBLIC_SUPABASE_URL

To fix this:
  Local development:
    1. Copy .env.example to .env.local
    2. Get your URL from: Supabase Dashboard → Project Settings → API
    3. Paste it into .env.local

  Production (Vercel):
    1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
    2. Add: NEXT_PUBLIC_SUPABASE_URL with your Supabase URL
    3. Redeploy
```

#### `getSupabaseServiceKey()`
Returns service role key or `null` if not set (allows graceful degradation).

```typescript
const serviceKey = getSupabaseServiceKey();
if (serviceKey) {
  // Use it for admin operations
} else {
  // Skip optional features that need it
}
```

#### `getJWTSecret()`
Returns validated JWT secret for session tokens.

```typescript
const secret = getJWTSecret();
// Will throw clear error if missing
```

---

### **3. Updated All Supabase Client Creation**

**Files updated:**
- ✅ `app/api/auth/signup/route.ts` - Signup API
- ✅ `lib/supabase.ts` - Server-side Supabase client
- ✅ `lib/auth.ts` - JWT auth utilities

**Before (problematic):**
```typescript
// TypeScript error: string | undefined not assignable to string
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,  // ❌ Could be undefined
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,  // ❌ Could be undefined
  { ... }
);
```

**After (safe):**
```typescript
import { getSupabaseEnv } from '@/lib/env';

// Validated at runtime, type-safe ✅
const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();
const supabase = createClient(supabaseUrl, supabaseAnonKey, { ... });
```

---

### **4. Improved Error Messages**

**Signup API now shows helpful errors:**

**Before:**
```json
{
  "error": "Failed to create account"
}
```

**After:**
```json
{
  "error": "Configuration error: Supabase environment variables are missing. In production, check Vercel → Settings → Environment Variables. For local development, copy .env.example to .env.local and fill in your Supabase credentials.",
  "type": "configuration_error",
  "details": "❌ Missing NEXT_PUBLIC_SUPABASE_URL..."
}
```

---

## 📋 Setup Instructions

### **Local Development**

#### Step 1: Create `.env.local`
```bash
# Copy the template
cp .env.example .env.local
```

#### Step 2: Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings → API**
4. Copy these values:
   - **URL:** Under "Project URL" (e.g., `https://xxx.supabase.co`)
   - **Anon Key:** Under "Project API keys" → `anon` `public`
   - **Service Role Key:** Under "Project API keys" → `service_role` (⚠️ Keep secret!)

#### Step 3: Fill in `.env.local`

```bash
# Open .env.local and paste your values
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-actual-service-key
JWT_SECRET=your-generated-secret-here
```

#### Step 4: Generate JWT Secret

```bash
# Generate a secure random secret
openssl rand -base64 32

# Copy the output and add to .env.local
```

#### Step 5: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Start it again
npm run dev
```

---

### **Production Deployment (Vercel)**

#### Step 1: Go to Vercel Dashboard

1. Navigate to your project
2. Go to **Settings → Environment Variables**

#### Step 2: Add Variables

Add each of these (click "Add Another"):

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` | Production, Preview, Development |
| `JWT_SECRET` | `your-secret-here` | Production, Preview, Development |

**Important:** 
- ✅ Check all three environment types (Production, Preview, Development)
- ✅ Use the same Supabase project for all environments (or create separate projects for staging/prod)

#### Step 3: Redeploy

After adding variables:
```bash
# Trigger a new deployment
git push origin main

# Or in Vercel dashboard: Deployments → Three dots → Redeploy
```

---

## 🧪 Testing

### **Verify Local Setup**

```bash
# Start dev server
npm run dev

# Try to sign up at: http://localhost:3000/member/signup
# Should work without "Configuration error" ✅
```

### **Verify Production Setup**

```bash
# After deploying, test signup on your live site
# Should work without errors ✅

# Check Vercel logs if issues occur:
# Vercel Dashboard → Deployments → View Function Logs
```

### **Test Error Handling**

```bash
# Temporarily remove an env var from .env.local
# Try signup - should see helpful error message ✅
```

---

## 🔒 Security Best Practices

### **What to Commit:**
- ✅ `.env.example` (template with placeholder values)
- ✅ `lib/env.ts` (validation helper)
- ❌ `.env.local` (contains real secrets - in `.gitignore`)
- ❌ `.env` (contains real secrets - in `.gitignore`)

### **Environment Variable Safety:**

| Variable | Safe in Client? | When to Use |
|----------|----------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Client & Server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes (public) | Client & Server |
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ NO! (bypasses RLS) | Server only |
| `JWT_SECRET` | ❌ NO! (critical secret) | Server only |

**Why `NEXT_PUBLIC_` prefix matters:**
- Variables with `NEXT_PUBLIC_` are bundled into client-side JavaScript
- Variables without it are server-only and never exposed to browsers

---

## 🐛 Troubleshooting

### **Error: "Missing NEXT_PUBLIC_SUPABASE_URL"**

**Cause:** Environment variable not set.

**Fix:**
```bash
# Local:
cp .env.example .env.local  # If you haven't already
# Add your Supabase URL to .env.local

# Production (Vercel):
# Add NEXT_PUBLIC_SUPABASE_URL in Vercel Environment Variables
# Redeploy
```

---

### **Error: "Configuration error: Supabase environment variables are missing"**

**Cause:** Signup API can't access Supabase credentials.

**Fix:**
1. Check `.env.local` exists and has values
2. Restart dev server: `npm run dev`
3. For production: Verify Vercel environment variables are set

---

### **Build succeeds but runtime fails**

**Cause:** Build uses placeholders, but runtime needs real values.

**Fix:**
- Environment variables are validated at runtime (when API routes are called)
- Build will succeed even without env vars (intentional for CI/CD)
- Make sure to set env vars before running the app

---

### **"Process is not defined" error in browser**

**Cause:** Trying to access `process.env` directly in client-side code.

**Fix:**
- Use the env helper: `import { getSupabaseEnv } from '@/lib/env'`
- Or only use `NEXT_PUBLIC_*` prefixed variables in client code

---

## 📊 Summary of Changes

| File | Change | Purpose |
|------|--------|---------|
| `.env.example` | ✅ Created | Template for developers |
| `lib/env.ts` | ✅ Created | Centralized env validation |
| `app/api/auth/signup/route.ts` | ✅ Updated | Use env helper, better errors |
| `lib/supabase.ts` | ✅ Updated | Use env helper |
| `lib/auth.ts` | ✅ Updated | Use JWT secret helper |

**Benefits:**
- 🎯 Clear error messages point to the exact fix
- 🔒 Type-safe environment variable access
- 🚀 Fails fast in development (not production)
- 📖 Self-documenting with `.env.example`
- 🐛 Easier debugging with helpful error text
- ✅ Production-safe (no breaking changes)

---

## ✅ Verification Checklist

Before deploying:

- [ ] `.env.example` exists and is committed
- [ ] `.env.local` exists locally (not committed) with real values
- [ ] `npm run dev` works without "Configuration error"
- [ ] Signup flow works locally
- [ ] All environment variables set in Vercel
- [ ] Production build succeeds
- [ ] Production signup works

---

## 🔄 Why This Prevents Future Issues

**Before:**
1. Developer clones repo
2. No guide on what env vars are needed
3. Runs app → mysterious failures
4. Hours debugging "why doesn't signup work?"

**After:**
1. Developer clones repo
2. Sees `.env.example` with clear instructions
3. Copies to `.env.local` and fills in values
4. App works immediately ✅

**Production:**
1. Deploy without env vars → helpful error message
2. Error tells exactly what to do
3. Add env vars in Vercel
4. Redeploy → works ✅

---

## 📚 Additional Resources

- [Supabase Environment Variables Guide](https://supabase.com/docs/guides/cli/config)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Created:** 2026-01-14  
**Purpose:** Prevent silent environment variable failures  
**Status:** ✅ Production-ready

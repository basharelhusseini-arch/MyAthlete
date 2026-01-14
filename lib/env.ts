/**
 * Centralized Environment Variable Validation
 * 
 * This module ensures that required Supabase environment variables are present
 * and provides type-safe access to them throughout the application.
 * 
 * Why this exists:
 * - Fails fast in development if env vars are missing
 * - Provides clear error messages pointing to the solution
 * - Prevents "string | undefined" TypeScript errors
 * - Single source of truth for env var access
 */

/**
 * Get and validate public Supabase environment variables
 * These are safe to use in client-side code (prefixed with NEXT_PUBLIC_)
 * 
 * @throws {Error} If any required env var is missing with helpful message
 */
export function getSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      '❌ Missing NEXT_PUBLIC_SUPABASE_URL\n\n' +
      'To fix this:\n' +
      '  Local development:\n' +
      '    1. Copy .env.example to .env.local\n' +
      '    2. Get your URL from: Supabase Dashboard → Project Settings → API\n' +
      '    3. Paste it into .env.local\n\n' +
      '  Production (Vercel):\n' +
      '    1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables\n' +
      '    2. Add: NEXT_PUBLIC_SUPABASE_URL with your Supabase URL\n' +
      '    3. Redeploy\n'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      '❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY\n\n' +
      'To fix this:\n' +
      '  Local development:\n' +
      '    1. Copy .env.example to .env.local\n' +
      '    2. Get your key from: Supabase Dashboard → Project Settings → API → anon public\n' +
      '    3. Paste it into .env.local\n\n' +
      '  Production (Vercel):\n' +
      '    1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables\n' +
      '    2. Add: NEXT_PUBLIC_SUPABASE_ANON_KEY with your Supabase anon key\n' +
      '    3. Redeploy\n'
    );
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
}

/**
 * Get service role key (server-side only, optional)
 * Returns null if not set (allows graceful degradation)
 */
export function getSupabaseServiceKey(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}

/**
 * Get JWT secret for custom session tokens
 * @throws {Error} If missing (required for auth)
 */
export function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error(
      '❌ Missing JWT_SECRET\n\n' +
      'To fix this:\n' +
      '  Local development:\n' +
      '    1. Generate a secret: openssl rand -base64 32\n' +
      '    2. Add to .env.local: JWT_SECRET=your-generated-secret\n\n' +
      '  Production (Vercel):\n' +
      '    1. Generate a secret: openssl rand -base64 32\n' +
      '    2. Add to Vercel Environment Variables: JWT_SECRET=your-generated-secret\n' +
      '    3. Redeploy\n'
    );
  }

  return secret;
}

/**
 * Validate all required environment variables at startup
 * Call this in your API routes or during initialization
 */
export function validateEnv() {
  try {
    getSupabaseEnv();
    getJWTSecret();
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('\n' + error.message);
    }
    throw error;
  }
}

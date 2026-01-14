import { createClient } from '@supabase/supabase-js';
import { getSupabaseEnv, getSupabaseServiceKey } from './env';

// Get environment variables (will throw clear error if missing)
// During build, placeholders are used; at runtime, real validation happens
let supabaseUrl: string;
let supabaseServiceKey: string;

try {
  const env = getSupabaseEnv();
  supabaseUrl = env.supabaseUrl;
  supabaseServiceKey = getSupabaseServiceKey() || 'placeholder-service-key';
} catch (error) {
  // During build, use placeholders to prevent build failures
  // Runtime API calls will fail with helpful error messages
  supabaseUrl = 'https://placeholder.supabase.co';
  supabaseServiceKey = 'placeholder-service-key';
  
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️  Supabase env vars not set. Using placeholders for build.');
    console.warn('   Copy .env.example to .env.local and add your Supabase credentials.');
  }
}

// Server-side client with service role (bypasses RLS)
export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          password_hash: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      daily_checkins: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          did_workout: boolean;
          calories: number;
          sleep_hours: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_checkins']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['daily_checkins']['Insert']>;
      };
      health_scores: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          score: number;
          training_score: number;
          diet_score: number;
          sleep_score: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['health_scores']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['health_scores']['Insert']>;
      };
    };
  };
};

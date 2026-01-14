import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Server-side client with service role (bypasses RLS)
// During build, use placeholder values; runtime will validate
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Runtime validation helper
export function validateSupabaseConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
  }
}

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

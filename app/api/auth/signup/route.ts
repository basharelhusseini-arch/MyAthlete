import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Defensive check for required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, phone } = body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create Supabase client for Auth (uses anon key, not service role)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Sign up with Supabase Auth
    // IMPORTANT: Only email and password at top level
    // Extra fields go in options.data
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone || null,
        },
      },
    });

    // Handle Supabase Auth errors with FULL details
    if (error) {
      console.error('Supabase Auth signup error:', {
        message: error.message,
        status: error.status,
        code: error.code,
        name: error.name,
      });

      // Return the REAL error message to the user
      return NextResponse.json(
        { 
          error: error.message || 'Failed to create account',
          code: error.code,
          details: error.status ? `Status: ${error.status}` : undefined,
        },
        { status: error.status || 400 }
      );
    }

    // Handle email confirmation flow
    // If user exists but session is null = email confirmation required
    if (data.user && !data.session) {
      console.log('User created, email confirmation required:', data.user.id);
      return NextResponse.json({
        success: true,
        requiresEmailConfirmation: true,
        message: 'Account created! Please check your email to confirm your account.',
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      });
    }

    // Success with immediate session (email confirmation disabled)
    if (data.user && data.session) {
      console.log('User created with session:', data.user.id);
      
      // Try to create profile record in users table (if it exists)
      // This is OPTIONAL and should not fail the signup
      try {
        const supabaseService = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY || '',
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          }
        );

        await supabaseService.from('users').insert({
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || null,
        });
      } catch (profileError: any) {
        // Log but don't fail - auth signup succeeded
        console.warn('Profile creation failed (non-critical):', profileError.message);
      }

      return NextResponse.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: firstName,
          lastName: lastName,
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        },
      });
    }

    // Unexpected: no error but also no user
    console.error('Unexpected signup result: no error, no user');
    return NextResponse.json(
      { error: 'Unexpected error during signup' },
      { status: 500 }
    );

  } catch (error: any) {
    console.error('Signup handler error:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
    });
    
    return NextResponse.json(
      { 
        error: error?.message || 'An unexpected error occurred. Please try again.',
        type: 'server_error',
      },
      { status: 500 }
    );
  }
}

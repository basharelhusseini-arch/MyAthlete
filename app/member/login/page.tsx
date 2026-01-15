'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BackgroundWordmark from '@/components/BackgroundWordmark';

export default function MemberLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        // Save auth data to localStorage
        localStorage.setItem('memberId', data.user.id);
        localStorage.setItem('memberName', `${data.user.firstName} ${data.user.lastName}`);
        localStorage.setItem('memberEmail', data.user.email);
        
        // Session cookie is set by the API
        // Redirect to dashboard
        router.push('/member/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-thrivv-bg-dark p-6 relative">
      {/* Layer A: Base background glow (z-index: 0) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-thrivv-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-thrivv-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Layer B: Background wordmark (z-index: 10) */}
      <div className="fixed inset-0" style={{ zIndex: 10, isolation: 'isolate' }}>
        <BackgroundWordmark />
      </div>

      {/* Layer D: Foreground content (z-index: 20) */}
      <div className="relative max-w-md w-full z-20">
        {/* Logo */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-thrivv-gold-500 to-thrivv-amber-500 mb-6 glow-gold">
            <span className="text-2xl font-bold text-black">T</span>
          </div>
          <h1 className="text-3xl font-semibold text-gradient mb-2">Welcome Back</h1>
          <p className="text-thrivv-text-secondary">Sign in to continue your journey</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-premium w-full px-5 py-4 text-base"
                placeholder="Email address"
              />
            </div>

            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-premium w-full px-5 py-4 text-base"
                placeholder="Password"
              />
            </div>

            {error && (
              <div className="error-badge px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-thrivv-text-secondary">
              Don&apos;t have an account?{' '}
              <Link href="/member/signup" className="text-thrivv-gold-500 hover:text-thrivv-gold-400 font-medium transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-thrivv-text-muted hover:text-thrivv-gold-500 transition-colors inline-flex items-center"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

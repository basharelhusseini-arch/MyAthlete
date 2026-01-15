'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Phone, Sparkles } from 'lucide-react';

export default function MemberSignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Check if email confirmation is required
        if (data.requiresEmailConfirmation) {
          setSuccess(data.message || 'Account created! Please check your email to confirm.');
          // Don't redirect - show success message
        } else {
          // Immediate login - save auth data to localStorage
          if (data.user) {
            localStorage.setItem('memberId', data.user.id);
            localStorage.setItem('memberName', `${data.user.firstName} ${data.user.lastName}`);
            localStorage.setItem('memberEmail', data.user.email);
          }
          
          // Redirect to dashboard
          setSuccess('Account created successfully! Redirecting...');
          setTimeout(() => router.push('/member/dashboard'), 1500);
        }
      } else {
        // Show the REAL error from Supabase
        const errorMessage = data.error || 'Registration failed';
        const errorDetails = data.details ? ` (${data.details})` : '';
        setError(errorMessage + errorDetails);
      }
    } catch (error: any) {
      console.error('Signup request failed:', error);
      setError(error?.message || 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-thrivv-bg-dark p-6">
      {/* Subtle background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-thrivv-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-thrivv-amber-500/5 rounded-full blur-3xl" />
        
        {/* Futuristic Background Text "BUILT TO THRIVV" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-background-text select-none">
            BUILT TO THRIVV
          </div>
        </div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-thrivv-gold-500 to-thrivv-amber-500 mb-6 glow-gold">
            <Sparkles className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-semibold text-gradient mb-2">Start Your Journey</h1>
          <p className="text-thrivv-text-secondary">Create your account to begin</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input-premium px-5 py-4 text-base"
                placeholder="First name"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input-premium px-5 py-4 text-base"
                placeholder="Last name"
              />
            </div>

            {/* Email */}
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-premium w-full px-5 py-4 text-base"
              placeholder="Email address"
            />

            {/* Phone */}
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-premium w-full px-5 py-4 text-base"
              placeholder="Phone number"
            />

            {/* Password */}
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-premium w-full px-5 py-4 text-base"
              placeholder="Password (6+ characters)"
            />

            {/* Confirm Password */}
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-premium w-full px-5 py-4 text-base"
              placeholder="Confirm password"
            />

            {error && (
              <div className="error-badge px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="success-badge px-4 py-3 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-thrivv-text-secondary">
              Already have an account?{' '}
              <Link href="/member/login" className="text-thrivv-gold-500 hover:text-thrivv-gold-400 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-thrivv-text-muted hover:text-thrivv-gold-500 transition-colors inline-flex items-center">
            ← Back to Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(251, 191, 36, 0.1),
              0 0 20px rgba(251, 191, 36, 0.1),
              0 0 30px rgba(251, 191, 36, 0.05);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(251, 191, 36, 0.15),
              0 0 30px rgba(251, 191, 36, 0.15),
              0 0 40px rgba(251, 191, 36, 0.1);
          }
        }

        .text-background-text {
          font-size: clamp(4rem, 15vw, 12rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0.05em;
          background: linear-gradient(
            135deg,
            rgba(251, 191, 36, 0.03) 0%,
            rgba(249, 115, 22, 0.05) 50%,
            rgba(251, 191, 36, 0.03) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          text-align: center;
          white-space: nowrap;
          animation: text-glow 4s ease-in-out infinite;
          opacity: 0.4;
          transform: translateY(-10%);
        }

        @media (max-width: 768px) {
          .text-background-text {
            font-size: clamp(2rem, 12vw, 6rem);
            white-space: normal;
            word-break: break-word;
            line-height: 0.9;
          }
        }
      `}</style>
    </div>
  );
}

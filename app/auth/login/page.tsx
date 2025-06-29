'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Eye, EyeOff, MessageCircle, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        // Refresh the session and redirect
        await getSession();
        router.push('/legends');
        router.refresh();
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/legends' });
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-green-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-black dark:text-white">
              Talk to Legends
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
            Welcome back
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sign in to continue your conversations with history's greatest minds
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-black dark:text-white font-medium">
                Email address
              </Label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-black dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-black dark:text-white font-medium">
                Password
              </Label>
              <div className="mt-2 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-black dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-green-600 dark:text-green-400 hover:text-green-500">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <div className="mt-6">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <Chrome className="h-5 w-5 mr-2" />
                Continue with Google
              </Button>
            </div>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-green-600 dark:text-green-400 hover:text-green-500 font-medium">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
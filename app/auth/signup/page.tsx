'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Eye, EyeOff, MessageCircle, Mail, Lock, User, ArrowRight, Chrome } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validation
      if (!acceptTerms) {
        setError('Please accept the terms and conditions');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      // Register user
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        setError(registerData.error || 'Registration failed');
        return;
      }

      // Auto-login after successful registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Registration successful, but login failed. Please try logging in manually.');
      } else {
        router.push('/legends');
        router.refresh();
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signIn('google', { callbackUrl: '/legends' });
    } catch (err) {
      setError('Google signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
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
            Create your account
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Start your journey with history's greatest minds
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-black dark:text-white font-medium">
                  First name
                </Label>
                <div className="mt-2 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="pl-10 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-black dark:text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName" className="text-black dark:text-white font-medium">
                  Last name
                </Label>
                <div className="mt-2">
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-black dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-black dark:text-white font-medium">
                Email address
              </Label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
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
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-black dark:text-white font-medium">
                Confirm password
              </Label>
              <div className="mt-2 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-black dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-neutral-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-neutral-600 dark:text-neutral-400">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 dark:text-green-400 hover:text-green-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:text-green-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Create account
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

            {/* Google Signup */}
            <div className="mt-6">
              <Button
                type="button"
                onClick={handleGoogleSignup}
                variant="outline"
                className="w-full border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <Chrome className="h-5 w-5 mr-2" />
                Continue with Google
              </Button>
            </div>
          </div>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-green-600 dark:text-green-400 hover:text-green-500 font-medium">
                Sign in
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
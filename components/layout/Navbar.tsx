'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X, MessageCircle, User, LogOut, Settings, History } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-700 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-black dark:text-white">
              Talk to Legends
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link href="/legends" className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium">
              Legends
            </Link>
            <Link href="/pricing" className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium">
              Pricing
            </Link>
            <Link href="/about" className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium">
              About
            </Link>
            <ThemeToggle />
            
            {/* Authentication Section */}
            {isLoading ? (
              <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
            ) : isAuthenticated && session?.user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {session.user.name ? getInitials(session.user.name) : 'U'}
                    </span>
                  </div>
                  <span className="font-medium">
                    {session.user.firstName || session.user.name?.split(' ')[0] || 'User'}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2">
                    <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                      <p className="text-sm font-medium text-black dark:text-white">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {session.user.email}
                      </p>
                    </div>
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link href="/conversations" className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                      <History className="h-4 w-4 mr-2" />
                      Conversations
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-black dark:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium px-4 py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/legends" 
                className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium px-4 py-2"
                onClick={toggleMenu}
              >
                Legends
              </Link>
              <Link 
                href="/pricing" 
                className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium px-4 py-2"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium px-4 py-2"
                onClick={toggleMenu}
              >
                About
              </Link>
              
              {/* Mobile Authentication */}
              {isAuthenticated && session?.user ? (
                <div className="px-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {session.user.name ? getInitials(session.user.name) : 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white">{session.user.name}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{session.user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link href="/profile" className="flex items-center px-2 py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link href="/conversations" className="flex items-center px-2 py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                      <History className="h-4 w-4 mr-2" />
                      Conversations
                    </Link>
                    <Link href="/settings" className="flex items-center px-2 py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-2 py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
                  <Link href="/auth/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full py-3 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 font-semibold rounded-lg transition-all duration-300">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={toggleMenu}>
                    <Button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
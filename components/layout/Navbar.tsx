'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
            <Link href="/legends">
              <Button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300">
                Start Chat
              </Button>
            </Link>
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
              <div className="px-4">
                <Link href="/legends" onClick={toggleMenu}>
                  <Button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300">
                    Start Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
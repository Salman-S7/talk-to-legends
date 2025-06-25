'use client';

import Link from 'next/link';
import { MessageCircle, Github, Twitter, Linkedin, Heart, Mail, Globe, ArrowRight, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
            Stay Connected
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Get updates on new historical figures, features, and insights from the past.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-black dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
            <Button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-black dark:text-white">
                Talk to Legends
              </span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              Experience meaningful conversations with history's greatest minds through advanced AI technology. 
              Learn from the past to shape your future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-300">
                <Github className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-300">
                <Twitter className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-300">
                <Mail className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-black dark:text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/legends" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Choose Legend
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legends */}
          <div>
            <h4 className="text-black dark:text-white font-semibold mb-6">Featured Legends</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/legends/gandhi/chat" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Mahatma Gandhi
                </Link>
              </li>
              <li>
                <Link href="/legends/einstein/chat" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Albert Einstein
                </Link>
              </li>
              <li>
                <Link href="/legends/cleopatra/chat" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Cleopatra VII
                </Link>
              </li>
              <li>
                <Link href="/legends" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-black dark:text-white font-semibold mb-6">Account</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/auth/login" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-8 py-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
            <Award className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Award Winning</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
            <Globe className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Global Access</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm flex items-center">
                Made with <Heart className="h-4 w-4 text-green-500 mx-2" /> for history enthusiasts
              </p>
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              © 2024 Talk to Legends. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
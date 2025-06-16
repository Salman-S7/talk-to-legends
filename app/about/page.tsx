import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, MessageCircle, Users, Zap, Heart, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
              About Talk to Legends
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Bridging the gap between past and present through AI-powered conversations with history's greatest minds.
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Mission Section */}
            <section className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-black dark:text-white">Our Mission</h2>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">
                Talk to Legends aims to make historical wisdom accessible to everyone. Through advanced AI technology, 
                we recreate the voices, thoughts, and personalities of history's most influential figures, allowing you 
                to learn from their experiences and gain insights that can guide your own journey.
              </p>
            </section>

            {/* How It Works */}
            <section className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-black dark:text-white">How It Works</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 text-sm font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white mb-1">Choose Your Legend</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">Select from our carefully curated collection of historical figures.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 text-sm font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white mb-1">Start Conversation</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">Begin your dialogue with a personalized greeting from your chosen legend.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 text-sm font-bold">3</div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white mb-1">Engage & Learn</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">Ask questions, seek advice, and explore their unique perspectives.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 text-sm font-bold">4</div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white mb-1">Apply Wisdom</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">Take their timeless insights and apply them to your modern life.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-black dark:text-white">Features</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-black dark:text-white mb-2">Diverse Legends</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">Leaders, scientists, philosophers, and innovators from across history.</p>
                </div>
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-black dark:text-white mb-2">Natural Conversations</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">Fluid, engaging dialogues that feel authentic and meaningful.</p>
                </div>
                <div className="text-center">
                  <Globe className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-black dark:text-white mb-2">Global Accessibility</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">Available worldwide, breaking down barriers to historical knowledge.</p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Ready to Begin Your Journey?</h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-8 text-lg">
                Start conversations with history's greatest minds and discover timeless wisdom for modern challenges.
              </p>
              <Link href="/legends">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Talking to Legends
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageCircle, Users, Zap, ArrowRight, Play, Star, Globe, Brain, Clock, Shield, Award, BookOpen, Target, Lightbulb, CheckCircle, Quote, TrendingUp, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingSection from '@/components/home/PricingSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-500 relative overflow-hidden">
        {/* Background Gradient Circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Hero Section Gradients */}
          <div className="absolute top-20 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-32 w-96 h-96 bg-green-400/15 rounded-full blur-3xl"></div>
          <div className="absolute top-80 left-1/3 w-64 h-64 bg-green-600/10 rounded-full blur-3xl"></div>
          
          {/* How It Works Section Gradients */}
          <div className="absolute top-[800px] -left-20 w-72 h-72 bg-green-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-[900px] right-10 w-60 h-60 bg-green-400/20 rounded-full blur-3xl"></div>
          
          {/* Meet the Legends Section Gradients */}
          <div className="absolute top-[1400px] left-1/4 w-80 h-80 bg-green-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[1600px] -right-40 w-96 h-96 bg-green-500/15 rounded-full blur-3xl"></div>
          
          {/* Benefits Section Gradients */}
          <div className="absolute top-[2200px] -left-32 w-88 h-88 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-[2400px] right-1/4 w-72 h-72 bg-green-600/15 rounded-full blur-3xl"></div>
          
          {/* Pricing Section Gradients */}
          <div className="absolute top-[2800px] left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[3000px] -right-20 w-80 h-80 bg-green-400/15 rounded-full blur-3xl"></div>
          
          {/* Testimonials Section Gradients */}
          <div className="absolute top-[3400px] left-1/3 w-60 h-60 bg-green-600/20 rounded-full blur-3xl"></div>
          
          {/* Stats Section Gradients */}
          <div className="absolute top-[3800px] -left-40 w-96 h-96 bg-green-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-[4000px] right-20 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
          
          {/* CTA Section Gradients */}
          <div className="absolute top-[4400px] left-1/4 w-80 h-80 bg-green-600/15 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                AI-Powered Conversations
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-black dark:text-white">
                Talk to
              </span>
              <span className="block bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Legends
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Have meaningful conversations with history's greatest minds through advanced AI.
              <span className="block mt-2 text-green-600 dark:text-green-400 font-medium">
                Einstein, Gandhi, Cleopatra, and more await your questions.
              </span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/legends">
                <Button className="px-8 py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Conversation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-all duration-300 backdrop-blur-sm">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-neutral-500 dark:text-neutral-400 text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-green-500 mr-1" />
                <span>50,000+ users</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-green-500 mr-1" />
                <span>Available worldwide</span>
              </div>
              <div className="flex items-center">
                <Brain className="h-4 w-4 text-green-500 mr-1" />
                <span>Advanced AI</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-green-50/50 dark:bg-green-900/5 backdrop-blur-sm z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                How It Works
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                Start meaningful conversations with historical figures in just three simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-16 bg-green-200 dark:bg-green-800 hidden md:block"></div>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Choose Your Legend</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Browse our collection of historical figures and select the one you'd like to converse with.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-16 bg-green-200 dark:bg-green-800 hidden md:block"></div>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Start the Conversation</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Begin with a greeting or jump straight into your questions. The AI will respond in character.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Learn & Discover</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Engage in meaningful dialogue and gain insights from history's greatest minds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Legends Preview */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                Meet the Legends
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                Carefully crafted AI personalities based on extensive historical research
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Gandhi */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 group hover:shadow-xl hover:shadow-green-500/10">
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-green-500/25">
                  <span className="text-2xl font-bold text-white">G</span>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 text-center">Mahatma Gandhi</h3>
                <p className="text-green-600 dark:text-green-400 text-center mb-4 font-medium">Father of the Nation</p>
                <p className="text-neutral-600 dark:text-neutral-300 text-center mb-6">
                  Learn about non-violence, truth, and peaceful resistance from India's independence leader.
                </p>
                <div className="text-center">
                  <Link href="/legends/gandhi/chat">
                    <Button variant="outline" className="group-hover:bg-green-50 dark:group-hover:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 backdrop-blur-sm">
                      Start Conversation
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Einstein */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 group hover:shadow-xl hover:shadow-green-500/10">
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-green-500/25">
                  <span className="text-2xl font-bold text-white">E</span>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 text-center">Albert Einstein</h3>
                <p className="text-green-600 dark:text-green-400 text-center mb-4 font-medium">Theoretical Physicist</p>
                <p className="text-neutral-600 dark:text-neutral-300 text-center mb-6">
                  Explore the mysteries of the universe through relativity, quantum mechanics, and curiosity.
                </p>
                <div className="text-center">
                  <Link href="/legends/einstein/chat">
                    <Button variant="outline" className="group-hover:bg-green-50 dark:group-hover:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 backdrop-blur-sm">
                      Start Conversation
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Cleopatra */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 group hover:shadow-xl hover:shadow-green-500/10">
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-green-500/25">
                  <span className="text-2xl font-bold text-white">C</span>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 text-center">Cleopatra VII</h3>
                <p className="text-green-600 dark:text-green-400 text-center mb-4 font-medium">Last Pharaoh of Egypt</p>
                <p className="text-neutral-600 dark:text-neutral-300 text-center mb-6">
                  Discover ancient wisdom, leadership, and diplomacy from one of history's most powerful rulers.
                </p>
                <div className="text-center">
                  <Link href="/legends/cleopatra/chat">
                    <Button variant="outline" className="group-hover:bg-green-50 dark:group-hover:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 backdrop-blur-sm">
                      Start Conversation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/legends">
                <Button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30">
                  View All Legends
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-green-50/50 dark:bg-green-900/5 backdrop-blur-sm z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                Why Talk to Legends?
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                Unlock the wisdom of the past to navigate the challenges of today
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Learn from Experience</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Gain insights from those who shaped history and overcame extraordinary challenges.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Personal Growth</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Apply timeless wisdom to your personal and professional development journey.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Fresh Perspectives</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  See modern problems through the lens of history's greatest thinkers and leaders.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Leadership Lessons</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Learn leadership principles from those who led nations, movements, and revolutions.
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Critical Thinking</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Develop analytical skills by engaging with history's most brilliant minds.
                </p>
              </div>

              {/* Benefit 6 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Inspiration</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Find motivation and courage from those who changed the world against all odds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Testimonials Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                What Users Say
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                Join thousands who have already discovered the power of historical wisdom
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-green-200 dark:border-green-800 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-green-500 mr-3" />
                  <div className="flex text-green-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6 italic">
                  "Talking to Einstein about creativity and problem-solving completely changed how I approach my work as an engineer. Incredible experience!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Sarah M.</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-green-200 dark:border-green-800 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-green-500 mr-3" />
                  <div className="flex text-green-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6 italic">
                  "Gandhi's insights on leadership and perseverance have been invaluable for my startup journey. It's like having a mentor from history."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">DJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">David J.</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Entrepreneur</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-green-200 dark:border-green-800 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-green-500 mr-3" />
                  <div className="flex text-green-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6 italic">
                  "As a history teacher, this platform has revolutionized how I engage my students. They're actually excited about learning history now!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Maria R.</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">History Teacher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-green-50/50 dark:bg-green-900/5 backdrop-blur-sm z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50K+</div>
                <p className="text-neutral-600 dark:text-neutral-400">Active Users</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">25+</div>
                <p className="text-neutral-600 dark:text-neutral-400">Historical Figures</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">1M+</div>
                <p className="text-neutral-600 dark:text-neutral-400">Conversations</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99%</div>
                <p className="text-neutral-600 dark:text-neutral-400">Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
              Ready to Learn from History?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
              Join thousands of curious minds exploring wisdom from the past.
              Your next great conversation is just one click away.
            </p>
            <Link href="/legends">
              <Button className="px-12 py-6 text-xl font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30">
                <MessageCircle className="mr-3 h-6 w-6" />
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
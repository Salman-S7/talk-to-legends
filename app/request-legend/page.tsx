'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  User, 
  Calendar, 
  Globe, 
  BookOpen, 
  Star, 
  Send, 
  Sparkles, 
  Heart,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

export default function RequestLegendPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    legendName: '',
    timeEra: '',
    profession: '',
    nationality: '',
    whyImportant: '',
    specificQuestions: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (status !== 'authenticated') {
      router.push('/auth/login');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/legend-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Request submission error:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const popularRequests = [
    { name: 'Leonardo da Vinci', votes: 234, category: 'Renaissance Artist' },
    { name: 'Marie Curie', votes: 189, category: 'Scientist' },
    { name: 'Nelson Mandela', votes: 156, category: 'Civil Rights Leader' },
    { name: 'Frida Kahlo', votes: 143, category: 'Artist' },
    { name: 'Nikola Tesla', votes: 128, category: 'Inventor' },
    { name: 'Maya Angelou', votes: 112, category: 'Writer & Poet' }
  ];

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-12 border border-green-200 dark:border-green-800 shadow-lg">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              
              <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
                Request Submitted! 🎉
              </h1>
              
              <p className="text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                Thank you for your legend request! Our team will review it and consider adding 
                <strong> {formData.legendName}</strong> to our platform. We'll notify you when they become available.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800 mb-8">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-green-700 dark:text-green-300">What's Next?</span>
                </div>
                <ul className="text-green-600 dark:text-green-400 text-sm space-y-2">
                  <li>• Our AI team will research and develop the legend</li>
                  <li>• You'll get early access when they're ready</li>
                  <li>• Help shape the future of Talk to Legends!</li>
                </ul>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => router.push('/legends')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
                >
                  Continue Chatting with Current Legends
                </Button>
                
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      legendName: '',
                      timeEra: '',
                      profession: '',
                      nationality: '',
                      whyImportant: '',
                      specificQuestions: '',
                      additionalInfo: ''
                    });
                  }}
                  variant="outline"
                  className="w-full border-neutral-300 dark:border-neutral-600"
                >
                  Request Another Legend
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-32 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl"></div>
          <div className="absolute top-[800px] left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-8">
              <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Help Us Expand Our Collection
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
              Request a Legend
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Who would you like to chat with? Help us prioritize which historical figures to add next to Talk to Legends.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Request Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black dark:text-white">Submit Your Request</h2>
                    <p className="text-neutral-600 dark:text-neutral-400">Tell us about the legend you'd like to meet</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Legend Name */}
                  <div>
                    <Label htmlFor="legendName" className="text-black dark:text-white font-medium">
                      Legend Name *
                    </Label>
                    <Input
                      id="legendName"
                      name="legendName"
                      value={formData.legendName}
                      onChange={handleInputChange}
                      placeholder="e.g., Leonardo da Vinci, Marie Curie, Nelson Mandela"
                      className="mt-2 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                      required
                    />
                  </div>

                  {/* Time Era and Profession */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeEra" className="text-black dark:text-white font-medium">
                        Time Era
                      </Label>
                      <Input
                        id="timeEra"
                        name="timeEra"
                        value={formData.timeEra}
                        onChange={handleInputChange}
                        placeholder="e.g., Renaissance, 20th Century"
                        className="mt-2 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="profession" className="text-black dark:text-white font-medium">
                        Profession/Role
                      </Label>
                      <Input
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        placeholder="e.g., Scientist, Artist, Leader"
                        className="mt-2 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                      />
                    </div>
                  </div>

                  {/* Nationality */}
                  <div>
                    <Label htmlFor="nationality" className="text-black dark:text-white font-medium">
                      Nationality/Origin
                    </Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="e.g., Italian, French, South African"
                      className="mt-2 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                    />
                  </div>

                  {/* Why Important */}
                  <div>
                    <Label htmlFor="whyImportant" className="text-black dark:text-white font-medium">
                      Why are they important? *
                    </Label>
                    <textarea
                      id="whyImportant"
                      name="whyImportant"
                      value={formData.whyImportant}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Describe their major contributions, achievements, or impact on history..."
                      className="mt-2 w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md text-black dark:text-white resize-none"
                      required
                    />
                  </div>

                  {/* Specific Questions */}
                  <div>
                    <Label htmlFor="specificQuestions" className="text-black dark:text-white font-medium">
                      What would you ask them?
                    </Label>
                    <textarea
                      id="specificQuestions"
                      name="specificQuestions"
                      value={formData.specificQuestions}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="What specific questions or topics would you want to discuss with this legend?"
                      className="mt-2 w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md text-black dark:text-white resize-none"
                    />
                  </div>

                  {/* Additional Info */}
                  <div>
                    <Label htmlFor="additionalInfo" className="text-black dark:text-white font-medium">
                      Additional Information
                    </Label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Any other details that would help us create an authentic representation..."
                      className="mt-2 w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md text-black dark:text-white resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || status !== 'authenticated'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting Request...
                      </div>
                    ) : status !== 'authenticated' ? (
                      'Sign In to Submit Request'
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Legend Request
                      </div>
                    )}
                  </Button>

                  {status !== 'authenticated' && (
                    <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => router.push('/auth/login')}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-500 p-0 h-auto font-normal"
                      >
                        Sign in
                      </Button>
                      {' '}to submit your legend request
                    </p>
                  )}
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Popular Requests */}
              <Card className="p-6 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-black dark:text-white">Most Requested</h3>
                </div>
                
                <div className="space-y-3">
                  {popularRequests.map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div>
                        <p className="font-medium text-black dark:text-white text-sm">{request.name}</p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">{request.category}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <Users className="h-3 w-3" />
                        <span className="text-xs font-medium">{request.votes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Process Info */}
              <Card className="p-6 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-2 mb-6">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-black dark:text-white">How It Works</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white text-sm">Submit Request</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Tell us about your desired legend</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white text-sm">Community Voting</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Others can upvote popular requests</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white text-sm">AI Development</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Our team creates the legend</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white text-sm">Launch & Notify</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">You get early access!</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                <div className="text-center">
                  <Award className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-black dark:text-white mb-2">Community Impact</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">847</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Requests Submitted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Legends Added</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
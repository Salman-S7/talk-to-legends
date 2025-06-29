'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2, AlertCircle, Sparkles, Heart, Star } from 'lucide-react';

interface VoicePlayerProps {
  text: string;
  legend: string;
  isVisible: boolean;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

export default function VoicePlayer({ 
  text, 
  legend, 
  isVisible, 
  onPlayStart, 
  onPlayEnd 
}: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up audio URL when component unmounts or text changes
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl, text]);

  // Stop audio when component becomes invisible
  useEffect(() => {
    if (!isVisible && isPlaying) {
      stopAudio();
    }
  }, [isVisible]);

  const generateAudio = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Clean up previous audio
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          legend,
          text,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate voice');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      return url;
    } catch (error) {
      console.error('Voice generation error:', error);
      setError(error instanceof Error ? error.message : 'Voice generation failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = async () => {
    try {
      let url = audioUrl;
      
      // Generate audio if not already available
      if (!url) {
        url = await generateAudio();
      }

      if (!url) return;

      // Create new audio element
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onloadstart = () => {
        setIsPlaying(true);
        onPlayStart?.();
      };

      audio.onended = () => {
        setIsPlaying(false);
        onPlayEnd?.();
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setError('Audio playback failed');
        onPlayEnd?.();
      };

      await audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
      setError('Playback failed');
      onPlayEnd?.();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    onPlayEnd?.();
  };

  const handleTogglePlay = () => {
    // Show coming soon modal instead of trying to play
    setShowComingSoonModal(true);
  };

  // Don't render if text is too short or empty
  if (!text || text.trim().length < 10) {
    return null;
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleTogglePlay}
          disabled={isLoading}
          className="h-7 px-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 text-xs"
          title="Play voice"
        >
          <Volume2 className="h-3 w-3 mr-1" />
          Listen
        </Button>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-neutral-200 dark:border-neutral-700 animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            
            <div className="text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Volume2 className="h-8 w-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                Voice Features Coming Soon! 🎙️
              </h3>

              {/* Description */}
              <div className="space-y-3 mb-6">
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  We're working hard to bring you authentic voice generation for all historical legends!
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                      What's Coming
                    </span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">
                    Hear Gandhi, Einstein, and Cleopatra speak in their authentic voices!
                  </p>
                </div>
              </div>

              {/* Features Preview */}
              <div className="text-left mb-6">
                <h4 className="font-semibold text-black dark:text-white mb-3 text-center">
                  Voice Features in Development:
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Authentic voice synthesis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Multiple language support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Emotional voice expressions</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    // Simulate joining waitlist
                    alert('🎉 Thanks for your interest! We\'ll notify you when voice features are ready.');
                    setShowComingSoonModal(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Notify Me When Ready
                </Button>
                
                <Button
                  onClick={() => setShowComingSoonModal(false)}
                  variant="outline"
                  className="w-full border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300"
                >
                  Continue Chatting
                </Button>
              </div>

              {/* Footer note */}
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                For now, enjoy unlimited text conversations! 💬
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
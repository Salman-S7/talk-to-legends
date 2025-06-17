'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';

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
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  // Don't render if text is too short or empty
  if (!text || text.trim().length < 10) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleTogglePlay}
        disabled={isLoading}
        className="h-7 px-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 text-xs"
        title={isPlaying ? 'Stop voice' : 'Play voice'}
      >
        {isLoading ? (
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
        ) : error ? (
          <AlertCircle className="h-3 w-3 mr-1 text-red-500" />
        ) : isPlaying ? (
          <VolumeX className="h-3 w-3 mr-1" />
        ) : (
          <Volume2 className="h-3 w-3 mr-1" />
        )}
        {isLoading ? 'Generating...' : isPlaying ? 'Stop' : 'Listen'}
      </Button>
      
      {error && (
        <span className="text-xs text-red-500 dark:text-red-400">
          Voice unavailable
        </span>
      )}
    </div>
  );
}
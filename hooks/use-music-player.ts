import { useRef, useState, useCallback, useEffect } from "react";
import { useAudio } from "@/lib/audio-context";
import { AudioTrackType } from "@/lib/_core/audio-manager";
import { useAppContext } from "@/lib/app-context";

interface Track {
  id: string;
  title: string;
  duration: string;
  category: "Free" | "Premium";
  isPremium: boolean;
  description: string;
}

/**
 * useMusicPlayer - Full AudioContext Integration
 * Connects UI track selection to AudioContext playback pipeline
 */
export function useMusicPlayer() {
  const audio = useAudio();
  const { session } = useAppContext();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);


  // Sync with AudioContext state
  useEffect(() => {
    if (audio.currentTrackId) {
      setCurrentTrack({
        id: audio.currentTrackId,
        title: audio.currentTrackId,
        duration: "",
        category: "Free",
        isPremium: false,
        description: "",
      });
      setIsPlaying(audio.isPlaying);
    } else {
      setCurrentTrack(null);
      setIsPlaying(false);
    }
  }, [audio.currentTrackId, audio.isPlaying]);

  const playTrack = useCallback(
    async (track: Track) => {
      
      try {
        // Call AudioContext.play() with track ID
        await audio.play(track.id as AudioTrackType);
        
        // Update local state
        setCurrentTrack(track);
        setIsPlaying(true);
      } catch (error) {
        console.error("[useMusicPlayer] playTrack error:", error);
      }
    },
    [audio, session.isPremium]
  );

  const pauseTrack = useCallback(async () => {
    try {
      await audio.pause();
      setIsPlaying(false);
    } catch (error) {
      console.error("[useMusicPlayer] pauseTrack error:", error);
    }
  }, [audio]);

  const resumeTrack = useCallback(async () => {
    try {
      await audio.resume();
      setIsPlaying(true);
    } catch (error) {
      console.error("[useMusicPlayer] resumeTrack error:", error);
    }
  }, [audio]);

  return {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    resumeTrack,
  };
}

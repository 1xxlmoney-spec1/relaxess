import { Platform } from "react-native";

export type AudioTrackType =
  | "ocean"
  | "summer-night"
  | "gentle-breathing"
  | "rain-after-midnight"
  | "whispering-forest"
  | "velvet-evening"
  | "blue-silence"
  | "slow-city-lights"
  | "cozy-fireplace"
  | "my-own-place"
  | "gentle-purring"
  | "deep-sleep-induction"
  | "calm-concentration"
  | "anxiety-relief"
  | "relaxm2"
  | "forest"
  | "rain";

export interface AudioTrack {
  id: AudioTrackType;
  name: string;
  duration: number;
  isPremium: boolean;
  isSessionAudio: boolean;
  s3Url: string;
}

export const AUDIO_TRACKS: Record<AudioTrackType, AudioTrack> = {
  ocean: {
    id: "ocean",
    name: "Calm Oceanic Tide",
    duration: 900,
    isPremium: false,
    isSessionAudio: true,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/calm-oceanic-tide.mp3",
  },
  "summer-night": {
    id: "summer-night",
    name: "Summer Night",
    duration: 900,
    isPremium: false,
    isSessionAudio: true,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/summer-night.mp3",
  },
  "gentle-breathing": {
    id: "gentle-breathing",
    name: "Gentle Breathing",
    duration: 900,
    isPremium: false,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/gentle-breathing.mp3",
  },
  "rain-after-midnight": {
    id: "rain-after-midnight",
    name: "Rain After Midnight",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/rain-after-midnight.mp3",
  },
  "whispering-forest": {
    id: "whispering-forest",
    name: "Whispering Forest",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/whispering-forest.mp3",
  },
  "velvet-evening": {
    id: "velvet-evening",
    name: "Velvet Evening",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/velvet-evening.mp3",
  },
  "blue-silence": {
    id: "blue-silence",
    name: "Blue Silence",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/blue-silence.mp3",
  },
  "slow-city-lights": {
    id: "slow-city-lights",
    name: "Slow City Lights",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/slow-city-lights.mp3",
  },
  "cozy-fireplace": {
    id: "cozy-fireplace",
    name: "Cozy Fireplace",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/cozy-fireplace.mp3",
  },
  "my-own-place": {
    id: "my-own-place",
    name: "My Own Place",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/my-own-place.mp3",
  },
  "gentle-purring": {
    id: "gentle-purring",
    name: "Gentle Purring",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/gentle-purring.mp3",
  },
  "deep-sleep-induction": {
    id: "deep-sleep-induction",
    name: "Deep Sleep Induction",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/sleep-mode.mp3",
  },
  "calm-concentration": {
    id: "calm-concentration",
    name: "Calm Concentration State",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/deep-focus.mp3",
  },
  "anxiety-relief": {
    id: "anxiety-relief",
    name: "Anxiety Relief",
    duration: 900,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/anxiety-relief.mp3",
  },
  "relaxm2": {
    id: "relaxm2",
    name: "Music",
    duration: 0,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/music.mp3",
  },
  "forest": {
    id: "forest",
    name: "Forest",
    duration: 0,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/forest.mp3",
  },
  "rain": {
    id: "rain",
    name: "Rain",
    duration: 0,
    isPremium: true,
    isSessionAudio: false,
    s3Url: "https://calmspace-audio.s3.us-east-1.amazonaws.com/rain.mp3",
  },
};

/**
 * AudioManager - CORE PLAYBACK ENGINE
 *
 * Pure audio playback engine. No business logic.
 * Single global instance controls all audio.
 *
 * Allowed methods:
 * - play(trackUrl: string)
 * - stop()
 * - switch(trackUrl: string)
 *
 * Internal state only:
 * - currentTrack: string | null
 * - isPlaying: boolean
 *
 * Single Track Policy: Only ONE track active at any time.
 * Starting new track immediately stops previous track.
 */
class AudioManagerCore {
  private static instance: AudioManagerCore;

  // Internal state only
  private currentTrack: string | null = null;
  private isPlaying: boolean = false;

  // Platform-specific audio elements
  private webAudioElement: HTMLAudioElement | null = null;

  // Listeners for state changes
  private listeners: Set<() => void> = new Set();

  private constructor() {
  }

  static getInstance(): AudioManagerCore {
    if (!AudioManagerCore.instance) {
      AudioManagerCore.instance = new AudioManagerCore();
    }
    return AudioManagerCore.instance;
  }

  /**
   * play(trackUrl: string)
   * Start playing audio from the given URL.
   * If a track is already playing, stop it first (single track policy).
   */
  async play(trackUrl: string): Promise<void> {
    try {
      // Single track policy: stop current track if playing
      if (this.isPlaying) {
        await this.stop();
      }


      if (Platform.OS === "web") {
        this.playOnWeb(trackUrl);
      } else {
        await this.playOnNative(trackUrl);
      }

      this.currentTrack = trackUrl;
      this.isPlaying = true;
      this.notifyListeners();
    } catch (error) {
      console.error("[AudioManager] play() error:", error);
      this.isPlaying = false;
      this.notifyListeners();
    }
  }

  /**
   * stop()
   * Stop audio playback and clear current track.
   */
  async stop(): Promise<void> {
    try {

      if (Platform.OS === "web" && this.webAudioElement) {
        this.webAudioElement.pause();
        this.webAudioElement.src = "";
        this.webAudioElement = null;
      }

      this.currentTrack = null;
      this.isPlaying = false;
      this.notifyListeners();
    } catch (error) {
      console.error("[AudioManager] stop() error:", error);
    }
  }

  /**
   * switch(trackUrl: string)
   * Equivalent to stop() + play(trackUrl).
   * Switches to a new track immediately.
   */
  async switch(trackUrl: string): Promise<void> {
    await this.stop();
    await this.play(trackUrl);
  }

  /**
   * Web platform: use HTML5 Audio API
   */
  private playOnWeb(trackUrl: string): void {
    try {
      // Clean up existing element
      if (this.webAudioElement) {
        this.webAudioElement.pause();
        this.webAudioElement.src = "";
        this.webAudioElement = null;
      }

      // Create new audio element
      this.webAudioElement = new Audio(trackUrl);
      this.webAudioElement.loop = true;
      this.webAudioElement.volume = 1;

      // Play immediately
      const playPromise = this.webAudioElement.play();

      if (playPromise) {
        playPromise.catch((err) => {
          console.error("[AUDIO PLAY FAILED]", err);
        });
      }
    } catch (error) {
      console.error("[AudioManager] Web playback error:", error);
      throw error;
    }
  }

  /**
   * Native platform: use expo-audio
   */
  private async playOnNative(trackUrl: string): Promise<void> {
    try {
      // Native implementation would use expo-audio here
      // For now, just log
    } catch (error) {
      console.error("[AudioManager] Native playback error:", error);
      throw error;
    }
  }

  /**
   * Internal: notify all listeners of state change
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get current track URL
   */
  getCurrentTrack(): string | null {
    return this.currentTrack;
  }

  /**
   * Get playback state
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const AudioManager = AudioManagerCore;

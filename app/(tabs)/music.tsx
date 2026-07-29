import React from "react";
import { ScrollView, View, Text, Pressable, Image, Alert, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useAppContext } from "@/lib/app-context";
import { useTranslation } from "@/lib/i18n";
import { AUDIO_TRACKS, AudioTrackType } from "@/lib/_core/audio-manager";
import { playAudio, getCurrentAudio, stopAudio } from "@/lib/audio-controller";
import { subscribe } from "@/lib/simple-audio";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface Track {
  id: AudioTrackType;
  title: string;
  duration: string;
  category: "Free" | "Premium";
  isPremium: boolean;
  descriptionKey: string;
}

// Build TRACKS array from AUDIO_TRACKS, maintaining consistent premium status
const TRACK_IDS: AudioTrackType[] = [
  "gentle-breathing",
  "rain-after-midnight",
  "whispering-forest",
  "velvet-evening",
  "blue-silence",
  "slow-city-lights",
  "ocean",
  "summer-night",
  "cozy-fireplace",
  "my-own-place",
  "gentle-purring",
  "deep-sleep-induction",
  "calm-concentration",
  "anxiety-relief",
];

const TRACK_DESCRIPTION_KEYS: Record<AudioTrackType, string> = {
  "gentle-breathing": "track.gentleBreathing",
  "rain-after-midnight": "track.rainAfterMidnight",
  "whispering-forest": "track.whisperingForest",
  "velvet-evening": "track.velvetEvening",
  "blue-silence": "track.blueSilence",
  "slow-city-lights": "track.slowCityLights",
  "ocean": "track.ocean",
  "summer-night": "track.summerNight",
  "cozy-fireplace": "track.cozyfireplace",
  "my-own-place": "track.myOwnPlace",
  "gentle-purring": "track.gentlePurring",
  "deep-sleep-induction": "track.deepSleepInduction",
  "calm-concentration": "track.calmConcentration",
  "anxiety-relief": "track.anxietyRelief",
  "relaxm2": "track.music",
  "forest": "track.forest",
  "rain": "track.rain",
};

const TRACK_DURATIONS: Record<AudioTrackType, string> = {
  "gentle-breathing": "7.5 min",
  "rain-after-midnight": "15 min",
  "whispering-forest": "15 min",
  "velvet-evening": "15 min",
  "blue-silence": "15 min",
  "slow-city-lights": "15 min",
  "ocean": "15 min",
  "summer-night": "15 min",
  "cozy-fireplace": "15 min",
  "my-own-place": "Custom",
  "gentle-purring": "15 min",
  "deep-sleep-induction": "15 min",
  "calm-concentration": "15 min",
  "anxiety-relief": "15 min",
  "relaxm2": "Looping",
  "forest": "Looping",
  "rain": "Looping",
};

const TRACKS: Track[] = TRACK_IDS.map((id) => {
  const audioTrack = AUDIO_TRACKS[id];
  return {
    id,
    title: audioTrack.name,
    duration: TRACK_DURATIONS[id],
    category: audioTrack.isPremium ? "Premium" : "Free",
    isPremium: audioTrack.isPremium,
    descriptionKey: TRACK_DESCRIPTION_KEYS[id],
  };
});

export default function MusicScreen() {
  const colors = useColors();
  const { session, theme, language } = useAppContext();
  const { t } = useTranslation(language);
  const isPremium = session.isPremium;
  const [, setRefresh] = React.useState(0);
  const [currentTrackId, setCurrentTrackId] = React.useState<AudioTrackType | null>(
    (getCurrentAudio() as AudioTrackType) || null
  );

  // Subscribe to audio state changes to update UI when playback stops
  React.useEffect(() => {
    const trackId = getCurrentAudio();
    if (trackId) {
      setCurrentTrackId(trackId as AudioTrackType);
    }

    // Subscribe to audio state changes
    const unsubscribe = subscribe((state) => {
      setCurrentTrackId(state.currentTrackId as AudioTrackType | null);
    });

    return unsubscribe;
  }, []);

  const handleTrackPress = async (track: Track) => {
    // Delegate ALL playback logic to unified AudioController
    const success = await playAudio(track.id, isPremium);
    if (success) {
      setCurrentTrackId(track.id as AudioTrackType);
      setRefresh(prev => prev + 1);
    }
  };

  const currentTrack = currentTrackId ? TRACKS.find(t => t.id === currentTrackId) : null;
  const isPlaying = currentTrackId !== null && currentTrackId !== undefined;

  return (
    <ScreenContainer key={`music-${theme}`} className="pt-24">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-20">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-4xl font-bold text-foreground mb-2">{t('music.title')}</Text>
            <Text className="text-muted text-sm">{t('music.subtitle')}</Text>
          </View>

          {/* Tracks */}
          <View className="gap-4">
            {TRACKS.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                isPremiumUser={isPremium}
                onPress={() => handleTrackPress(track)}
                colors={colors}
                currentTrackId={currentTrackId}
                t={t}
              />
            ))}
          </View>

          {/* Premium Information Section */}
          {!isPremium && (
            <View className="mt-12 mb-8 bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <Text className="text-sm text-foreground leading-relaxed">
                {t('music.premiumInfo')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

interface TrackCardProps {
  track: Track;
  isPlaying: boolean;
  isPremiumUser: boolean;
  onPress: () => void;
  colors: any;
  currentTrackId: AudioTrackType | null;
  t: (key: string) => string;
}

function TrackCard({ track, isPlaying, isPremiumUser, onPress, colors, currentTrackId, t }: TrackCardProps) {
  const isLocked = track.isPremium && !isPremiumUser;

  // Handle play/pause toggle
  const handlePlayPausePress = () => {
    if (isPlaying) {
      // If currently playing, stop it
      stopAudio();
    } else {
      // If not playing, start playback
      onPress();
    }
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        onPress={isLocked ? undefined : onPress}
        disabled={isLocked}
        activeOpacity={isLocked ? 1 : 0.7}
      >
        <View
          className={cn(
            "rounded-2xl p-4 border",
            isPlaying
              ? "bg-primary/10 border-primary"
              : "bg-surface border-border",
            isLocked && "opacity-60"
          )}
        >
          <View className="flex-row items-center justify-between">
            {/* Track Info */}
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-1">
                <Text className="text-lg font-semibold text-foreground">
                  {track.title}
                </Text>
                {isLocked && (
                  <MaterialIcons name="lock" size={16} color={colors.muted} />
                )}
              </View>
              <Text className="text-sm text-muted mb-2">{t(track.descriptionKey)}</Text>
              <View className="flex-row items-center gap-3 mb-2">
                <View className="bg-primary/20 px-2 py-1 rounded-full">
                  <Text className="text-xs font-medium text-primary">
                    {track.isPremium ? t('music.category.premium') : t('music.category.free')}
                  </Text>
                </View>
              </View>
              {!isLocked && !isPremiumUser && (
                <Text className="text-xs text-muted">{t('music.freeLimit')}</Text>
              )}
              {isPremiumUser && (
                <Text className="text-xs text-primary">{t('music.unlimitedListening')}</Text>
              )}
            </View>

            {/* Play/Pause Button */}
            {!isLocked && (
              <Pressable
                onPress={handlePlayPausePress}
                style={({ pressed }) => ({
                  marginLeft: 16,
                  transform: [{ scale: pressed ? 0.92 : 1 }],
                })}
              >
                <View
                  className={cn(
                    "w-12 h-12 rounded-full items-center justify-center",
                    isPlaying && track.id === (currentTrackId as AudioTrackType) ? "bg-primary" : "bg-primary/20"
                  )}
                >
                  <MaterialIcons
                    name={isPlaying && track.id === (currentTrackId as AudioTrackType) ? "pause" : "play-arrow"}
                    size={24}
                    color={isPlaying && track.id === (currentTrackId as AudioTrackType) ? colors.background : colors.primary}
                  />
                </View>
              </Pressable>
            )}

            {/* Lock Icon */}
            {isLocked && (
              <View className="ml-4 w-12 h-12 rounded-full items-center justify-center bg-muted/20">
                <MaterialIcons name="lock" size={24} color={colors.muted} />
              </View>
            )}
          </View>

          {/* Playing Indicator */}
          {isPlaying && (
            <View className="mt-3 h-1 bg-primary/30 rounded-full overflow-hidden">
              <Animated.View
                className="h-full bg-primary"
                style={{ width: "33%" }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

/**
 * Mapping of emotional tones to LINGUA spectrum colors.
 * Used for annotating translations with emotional context.
 */
export const emotionColors: Record<string, string> = {
  warm: "#F59E0B",
  neutral: "#3B82F6",
  urgent: "#EF4444",
  sensitive: "#FB7185",
  joyful: "#FBBF24",
  formal: "#8B5CF6",
  informal: "#10B981",
};

/**
 * Extended emotion palette for finer-grained annotation.
 */
export const emotionColorsExtended: Record<string, string> = {
  // Core emotions
  warm: "#F59E0B",
  neutral: "#3B82F6",
  urgent: "#EF4444",
  sensitive: "#FB7185",
  joyful: "#FBBF24",
  formal: "#8B5CF6",
  informal: "#10B981",

  // Additional emotions
  melancholy: "#6366F1",
  playful: "#F97316",
  reverent: "#7C3AED",
  sarcastic: "#14B8A6",
  angry: "#DC2626",
  fearful: "#9333EA",
  hopeful: "#22C55E",
  nostalgic: "#A78BFA",
  romantic: "#EC4899",
  humorous: "#FCD34D",
  solemn: "#475569",
  confused: "#94A3B8",
};

/**
 * Get the color for an emotion, falling back to neutral.
 */
export function getEmotionColor(emotion: string): string {
  return (
    emotionColorsExtended[emotion.toLowerCase()] ||
    emotionColors.neutral
  );
}

/**
 * Get a human-readable label for an emotion.
 */
export function getEmotionLabel(emotion: string): string {
  const labels: Record<string, string> = {
    warm: "Warm & Affectionate",
    neutral: "Neutral",
    urgent: "Urgent",
    sensitive: "Sensitive & Delicate",
    joyful: "Joyful & Celebratory",
    formal: "Formal & Professional",
    informal: "Casual & Friendly",
    melancholy: "Melancholy",
    playful: "Playful",
    reverent: "Reverent & Sacred",
    sarcastic: "Sarcastic / Ironic",
    angry: "Angry",
    fearful: "Fearful",
    hopeful: "Hopeful",
    nostalgic: "Nostalgic",
    romantic: "Romantic",
    humorous: "Humorous",
    solemn: "Solemn & Grave",
    confused: "Uncertain / Confused",
  };
  return labels[emotion.toLowerCase()] || emotion;
}

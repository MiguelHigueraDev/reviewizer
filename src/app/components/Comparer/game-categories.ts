export type Category =
  | "Graphics"
  | "Story"
  | "Gameplay"
  | "Music"
  | "Challenge"
  | "Replayability"
  | "Progression"
  | "Value for Money";

export const categories: Category[] = [
  "Graphics",
  "Story",
  "Gameplay",
  "Music",
  "Challenge",
  "Replayability",
  "Progression",
  "Value for Money",
];

export const emojiMap: Record<Category, string> = {
  Graphics: "🎨",
  Story: "📖",
  Gameplay: "🎮",
  Music: "🎵",
  Challenge: "🧩",
  Replayability: "🔁",
  Progression: "📈",
  "Value for Money": "💰",
};

export const descriptionMap: Record<Category, string> = {
  Graphics: "Visual fidelity, art style, performance, and polish.",
  Story: "Narrative quality, characters, worldbuilding, and pacing.",
  Gameplay: "Core mechanics, controls, depth, and fun.",
  Music: "Soundtrack, sound effects, and audio atmosphere.",
  Challenge: "Difficulty balance, learning curve, and fairness.",
  Replayability: "Variety, randomness, and reasons to return.",
  Progression: "Sense of growth: unlocks, goals, pacing.",
  "Value for Money": "Content, longevity, and enjoyment per price.",
};


export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface SceneAnalysis {
  environment: string;
  sensoryDetails: string;
  implicitConflict: string;
  keyMotifs: string[];
}

export interface StoryDossier {
  title: string;
  genre: string;
  moodSummary: string;
  colorPalette: ColorSwatch[];
  sceneAnalysis: SceneAnalysis;
  openingParagraph: string;
  continuationHooks: string[];
  suggestedNarrationVoiceStyle?: string;
}

export type NarrationVoice = 'Fenrir' | 'Kore' | 'Puck' | 'Charon' | 'Zephyr';

export interface VoiceOption {
  id: NarrationVoice;
  name: string;
  gender: string;
  persona: string;
  description: string;
}

export type ModelComplexity = 'fast' | 'general' | 'complex';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  modelUsed?: string;
  complexity?: ModelComplexity;
}

export interface PresetImage {
  id: string;
  title: string;
  genre: string;
  tone: string;
  description: string;
  thumbnail: string;
  fullUrl: string;
}

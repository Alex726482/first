import { PresetImage } from '../types';

export const PRESET_IMAGES: PresetImage[] = [
  {
    id: 'cyberpunk-neon',
    title: 'Rain-Slicked Neon Alley',
    genre: 'Cyberpunk Noir',
    tone: 'Melancholic, Gritty, Electric',
    description: 'A labyrinth of hanging holograms, steam rising from drainage grates, and reflections in dark puddles.',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&q=80',
    fullUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'gothic-cathedral-library',
    title: 'Forgotten Arcane Library',
    genre: 'Gothic Dark Academia',
    tone: 'Haunting, Enigmatic, Reverent',
    description: 'Towering stained glass, spirals of dust dancing in moonbeams, and ancient leather-bound tomes whispering forgotten rites.',
    thumbnail: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?auto=format&fit=crop&w=400&q=80',
    fullUrl: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'misty-ancient-forest',
    title: 'The Whispering Mistwoods',
    genre: 'Dark Mythic Fantasy',
    tone: 'Ethereal, Primeval, Ominous',
    description: 'Gnarled colossal oaks cloaked in silver lichen, emerald moss carpets, and an unsettling stillness before twilight.',
    thumbnail: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=400&q=80',
    fullUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'desert-solitude-ruins',
    title: 'Outpost of the Red Dunes',
    genre: 'Speculative Sci-Fi / Solitary Western',
    tone: 'Desolate, Sun-Bleached, Contemplative',
    description: 'Rusting communications antennae piercing an endless crimson horizon under a twin-moon sky.',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    fullUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'victorian-manor-storm',
    title: 'Blackwood Estate at Dusk',
    genre: 'Victorian Gothic Romance',
    tone: 'Foreboding, Aristocratic, Chilling',
    description: 'Iron wrought gates draped in ivy, distant storm clouds gathering over an isolated coastal cliff manor.',
    thumbnail: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80',
    fullUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85',
  },
];

export const GENRE_OPTIONS = [
  'Auto-Detect from Image',
  'Literary Fiction',
  'Gothic Dark Academia',
  'Cyberpunk Noir',
  'High / Dark Fantasy',
  'Speculative Sci-Fi',
  'Psychological Thriller',
  'Magical Realism',
  'Cosmic / Weird Horror',
  'Historical Romance',
];

export const TONE_OPTIONS = [
  'Atmospheric & Sensory',
  'Melancholic & Poetic',
  'Suspenseful & Urgent',
  'Ethereal & Dreamlike',
  'Gritty & Noir',
  'Somber & Philosophical',
  'Whimsical & Wonderous',
];

export const VOICE_OPTIONS: Array<{
  id: 'Fenrir' | 'Kore' | 'Puck' | 'Charon' | 'Zephyr';
  name: string;
  persona: string;
  gender: string;
  description: string;
  recommendedTone: string;
}> = [
  {
    id: 'Fenrir',
    name: 'Fenrir',
    persona: 'The Cinematic Bard',
    gender: 'Deep Baritone',
    description: 'Resonant, gravelly, cinematic depth ideal for epic fantasy, thriller, and noir.',
    recommendedTone: 'Noir, Dark Fantasy, Thrillers',
  },
  {
    id: 'Kore',
    name: 'Kore',
    persona: 'The Enigmatic Oracle',
    gender: 'Warm Contralto',
    description: 'Intimate, velvety, and emotionally nuanced. Perfect for lyrical prose and mystery.',
    recommendedTone: 'Gothic, Magical Realism, Drama',
  },
  {
    id: 'Puck',
    name: 'Puck',
    persona: 'The Inquisitive Storyteller',
    gender: 'Spirited Tenor',
    description: 'Crisp, curious, and vivid. Great for dynamic pacing and speculative worlds.',
    recommendedTone: 'Sci-Fi, Adventure, Whimsical',
  },
  {
    id: 'Charon',
    name: 'Charon',
    persona: 'The Chronicler of Shadows',
    gender: 'Solemn Bass',
    description: 'Low, deliberate, haunted cadence suited for horror, tragedy, and ancient lore.',
    recommendedTone: 'Cosmic Horror, Historical, Tragedy',
  },
  {
    id: 'Zephyr',
    name: 'Zephyr',
    persona: 'The Classic Narrator',
    gender: 'Gentle Mezzo',
    description: 'Balanced, soothing, articulate delivery reminiscent of vintage audiobooks.',
    recommendedTone: 'Literary Fiction, Romance, General',
  },
];

/**
 * 🎁 CORE DOMAIN TYPES FOR DIGITAL GIFT EXPERIENCE PLATFORM
 */

export type OccasionType = 'birthday' | 'anniversary' | 'apology' | 'gratitude' | 'surprise';

export type ThemeVibe = 'editorial-rose' | 'warm-champagne' | 'midnight-sky' | 'botanical-sage';

export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
}

export type InteractiveMomentType = 'cake' | 'milestone' | 'scratch' | 'bouquet';

export interface GiftExperience {
  id: string;
  title: string;
  occasion: OccasionType;
  theme: ThemeVibe;
  
  // People
  recipientName: string;
  petName: string;
  senderName: string;

  // Chapter 1: The Entrance Cover
  coverTitle: string;
  coverSubtitle: string;

  // Chapter 2: The Letter
  letterTitle: string;
  letterParagraphs: string[];
  letterClosing: string;

  // Chapter 3: The Memory Gallery (optional / curated)
  photos: MemoryPhoto[];

  // Chapter 4: The Interactive Moment
  momentType: InteractiveMomentType;
  momentTitle?: string;
  momentDescription?: string;
  secretMessage?: string; // For scratch / tap to reveal
  milestoneNumber?: number; // e.g. 21 for age, or 2 for anniversary years

  // Atmosphere & Reply
  bgmUrl: string;
  senderWhatsApp?: string;
}

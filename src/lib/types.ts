export type AudioType = "music" | "sfx";

export type AudioAsset = {
  id: string;
  name: string;
  type: AudioType;
  category?: string;
  url: string;
  duration?: number;
  volume?: number;
  isLicensed?: boolean;
};

export type ProjectAudio = {
  id?: string;
  audioAssetId?: string;
  type: AudioType;
  url: string;
  volume: number;
  startTime: number;
  endTime?: number;
  fadeIn: number;
  fadeOut: number;
  ducking: boolean;
};

export type SceneSFX = {
  id: string;
  name: string;
  url: string;
  volume: number;
  offset: number;
};

export type Scene = {
  id: string;
  order: number;
  title: string;
  type: "hook" | "content" | "shloka" | "meaning" | "lesson" | "cta";
  duration: number; // in seconds
  prompt: string;
  text: string;
  narration: string;
  onScreenText: string;
  imageUrl?: string;
  audioUrl?: string;
  captionEnabled?: boolean;
  captionPosition?: "top" | "center" | "bottom";
  captionAnimation?: "fade" | "pop" | "slide" | "highlight";
  captionFontSize?: number;
  captionColor?: string;
  captionBackground?: boolean;
  captionStart?: number;
  captionEnd?: number;
  sfx?: SceneSFX[];
};

export type ReelTemplate = {
  id: string;
  name: string;
  description: string;
  icon: string;
  contentType: string;
  visualStyle: string;
  language: string;
  voice: string;
  musicCategory?: string;
  musicVolume?: number;
  musicDucking?: boolean;
  samplePrompt: string;
  scenes: Omit<Scene, "id">[];
};

export type SocialPlatform = "INSTAGRAM" | "YOUTUBE" | "FACEBOOK" | "TIKTOK";

export type PublishStatus = "DRAFT" | "SCHEDULED" | "PUBLISHING" | "PUBLISHED" | "FAILED";

export type PublishJob = {
  id?: string;
  projectId: string;
  platform: SocialPlatform;
  status: PublishStatus;
  title?: string;
  description?: string;
  caption?: string;
  hashtags?: string;
  videoUrl?: string;
  scheduledAt?: string;
  publishedAt?: string;
  platformPostId?: string;
  platformPostUrl?: string;
  errorMessage?: string;
};

import type { AudioAsset } from "@/lib/types";

export const audioLibrary: AudioAsset[] = [
  {
    id: "music-spiritual-01",
    name: "Spiritual Peace",
    type: "music",
    category: "Spiritual",
    url: "https://actions.google.com/sounds/v1/ambiences/temple_bell_meditation.ogg",
    volume: 0.25,
    isLicensed: true,
  },
  {
    id: "music-cinematic-01",
    name: "Cinematic Journey",
    type: "music",
    category: "Cinematic",
    url: "https://actions.google.com/sounds/v1/ambiences/cinematic_orchestral_drone.ogg",
    volume: 0.3,
    isLicensed: true,
  },
  {
    id: "music-motivation-01",
    name: "Rise Up",
    type: "music",
    category: "Motivation",
    url: "https://actions.google.com/sounds/v1/ambiences/energetic_drum_rhythm.ogg",
    volume: 0.3,
    isLicensed: true,
  },
  {
    id: "music-ambient-01",
    name: "Calm Ambient",
    type: "music",
    category: "Ambient",
    url: "https://actions.google.com/sounds/v1/ambiences/peaceful_stream_flow.ogg",
    volume: 0.2,
    isLicensed: true,
  },
  {
    id: "sfx-whoosh-01",
    name: "Whoosh Transition",
    type: "sfx",
    category: "Transition",
    url: "https://actions.google.com/sounds/v1/foley/whoosh_heavy_pass.ogg",
    volume: 0.5,
    isLicensed: true,
  },
  {
    id: "sfx-impact-01",
    name: "Cinematic Impact",
    type: "sfx",
    category: "Impact",
    url: "https://actions.google.com/sounds/v1/impacts/deep_sub_impact.ogg",
    volume: 0.5,
    isLicensed: true,
  },
  {
    id: "sfx-bell-01",
    name: "Temple Bell",
    type: "sfx",
    category: "Spiritual",
    url: "https://actions.google.com/sounds/v1/tools/brass_bell_ding.ogg",
    volume: 0.4,
    isLicensed: true,
  },
  {
    id: "sfx-sparkle-01",
    name: "Magic Sparkle",
    type: "sfx",
    category: "Magic",
    url: "https://actions.google.com/sounds/v1/cartoon/glockenspiel_chime.ogg",
    volume: 0.4,
    isLicensed: true,
  },
];

export const sfxLibrary: AudioAsset[] = audioLibrary.filter((a) => a.type === "sfx");
export const musicLibrary: AudioAsset[] = audioLibrary.filter((a) => a.type === "music");

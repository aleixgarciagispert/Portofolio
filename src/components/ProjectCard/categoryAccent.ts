// Deterministic accent per project category, so developer cards get a distinct
// gradient + matching glow color without needing per-project data entry.
interface Accent {
  gradient: string;
  glow: string;
}

const CATEGORY_ACCENTS: Record<string, Accent> = {
  'WEB APPS': { gradient: 'from-[#0f2a1b] via-[#1e5c38] to-[#0a1f14]', glow: 'rgba(58,178,110,0.45)' },
  'Houdini Tools': { gradient: 'from-[#0d2a14] via-[#12401b] to-[#081d0e]', glow: 'rgba(60,220,120,0.4)' },
  'OPEN SOURCE': { gradient: 'from-[#241a3a] via-[#3d2a63] to-[#160f26]', glow: 'rgba(150,90,255,0.4)' },
  INTERACTIVE: { gradient: 'from-[#2a1a3a] via-[#4a2a63] to-[#1a1026]', glow: 'rgba(190,110,255,0.4)' },
};

const FALLBACK_ACCENTS: Accent[] = [
  { gradient: 'from-[#0f2a1b] via-[#1e5c38] to-[#0a1f14]', glow: 'rgba(58,178,110,0.45)' },
  { gradient: 'from-[#0d2a14] via-[#12401b] to-[#081d0e]', glow: 'rgba(60,220,120,0.4)' },
  { gradient: 'from-[#241a3a] via-[#3d2a63] to-[#160f26]', glow: 'rgba(150,90,255,0.4)' },
  { gradient: 'from-[#1a1a1a] via-[#2b2b2b] to-[#0d0d0d]', glow: 'rgba(255,255,255,0.18)' },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function categoryAccent(category: string): Accent {
  if (CATEGORY_ACCENTS[category]) return CATEGORY_ACCENTS[category];
  const index = hashString(category) % FALLBACK_ACCENTS.length;
  return FALLBACK_ACCENTS[index];
}

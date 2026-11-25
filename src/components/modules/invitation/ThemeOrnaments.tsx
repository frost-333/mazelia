import * as React from 'react';
import { OpeningTransitionType } from '@/lib/constants/themes';

interface FlourishProps {
  color?: string;
  className?: string;
  themeId?: string;
}

/**
 * Dynamic theme header motif switcher that chooses the ideal motif for each theme
 */
export function ThemeHeaderMotif({ themeId, color, className = '' }: { themeId: string; color?: string; className?: string }) {
  if (themeId === 'midnight_celestial') {
    return <CelestialCrest color={color} className={className} />;
  }
  if (themeId === 'javanese_heritage') {
    return <GununganHeritageMotif color={color} className={className} />;
  }
  if (themeId === 'romantic_rose') {
    return <RoseFiligree color={color} className={className} />;
  }
  if (themeId === 'emerald_garden') {
    return <BotanicalHeaderMotif color={color} className={className} />;
  }
  return <ChampagneCrest color={color} className={className} />;
}

/**
 * Champagne Royale Crown & Laurel Crest
 */
export function ChampagneCrest({ color = '#C5A46D', className = '' }: FlourishProps) {
  return (
    <div className={`flex flex-col items-center justify-center my-3 select-none ${className}`}>
      <svg className="w-28 h-14 opacity-95 drop-shadow-sm" viewBox="0 0 120 60" fill="none">
        {/* Royal Crown Silhouette */}
        <path
          d="M42 36 L 38 18 L 50 26 L 60 12 L 70 26 L 82 18 L 78 36 Z"
          stroke={color}
          strokeWidth="1.6"
          fill={color}
          fillOpacity="0.18"
          strokeLinejoin="round"
        />
        <line x1="40" y1="40" x2="80" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="60" cy="9" r="2.2" fill={color} />
        <circle cx="38" cy="15" r="1.6" fill={color} />
        <circle cx="82" cy="15" r="1.6" fill={color} />
        {/* Side Laurel Flourishes */}
        <path d="M34 38 C 22 36, 14 28, 10 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M24 34 Q 18 28 24 24" stroke={color} strokeWidth="1.1" fill={color} fillOpacity="0.2" />
        <path d="M86 38 C 98 36, 106 28, 110 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M96 34 Q 102 28 96 24" stroke={color} strokeWidth="1.1" fill={color} fillOpacity="0.2" />
      </svg>
    </div>
  );
}

/**
 * Centerpiece divider flourish placed between sections
 */
export function FlourishDivider({ color = '#B69A72', className = '', themeId = 'champagne_gold' }: FlourishProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-5 select-none ${className}`}>
      <svg className="w-16 sm:w-28 h-3 opacity-70" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
        <path d="M0 5 Q 50 1 100 5" stroke={color} strokeWidth="1.5" />
        <circle cx="95" cy="5" r="2" fill={color} />
      </svg>

      <div className="flex items-center gap-2 opacity-95 animate-pulse-glow">
        {themeId === 'romantic_rose' ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke={color}
              strokeWidth="1.5"
              fill={color}
              fillOpacity="0.25"
            />
          </svg>
        ) : themeId === 'javanese_heritage' ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L 19 12 L 12 22 L 5 12 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.25" />
            <circle cx="12" cy="12" r="2.5" fill={color} />
          </svg>
        ) : themeId === 'emerald_garden' ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 3 C 7 8, 7 16, 12 21 C 17 16, 17 8, 12 3 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.25" />
            <path d="M12 6 V 18" stroke={color} strokeWidth="1" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L14.2 8.5L21 9L15.8 13.5L17.5 20.2L12 16.5L6.5 20.2L8.2 13.5L3 9L9.8 8.5L12 2Z"
              stroke={color}
              strokeWidth="1.5"
              fill={color}
              fillOpacity="0.25"
            />
          </svg>
        )}
      </div>

      <svg className="w-16 sm:w-28 h-3 opacity-70" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
        <path d="M100 5 Q 50 1 0 5" stroke={color} strokeWidth="1.5" />
        <circle cx="5" cy="5" r="2" fill={color} />
      </svg>
    </div>
  );
}

/**
 * Classical royal corner ornament for invitation cards and hero headers
 */
export function CornerFlourish({
  color = '#B69A72',
  className = '',
  position = 'tl',
  themeId = 'champagne_gold',
}: FlourishProps & { position?: 'tl' | 'tr' | 'bl' | 'br' }) {
  let transform = '';
  if (position === 'tr') transform = 'scale-x-[-1]';
  else if (position === 'bl') transform = 'scale-y-[-1]';
  else if (position === 'br') transform = 'scale-[-1]';

  return (
    <div className={`pointer-events-none select-none ${transform} ${className}`}>
      <svg className="w-14 h-14 sm:w-20 sm:h-20 opacity-85 drop-shadow-sm" viewBox="0 0 80 80" fill="none">
        {themeId === 'javanese_heritage' ? (
          <>
            {/* Javanese Ukiran Corner */}
            <path d="M4 76 V 12 C 4 8, 8 4, 12 4 H 76" stroke={color} strokeWidth="2.2" />
            <path d="M10 76 V 18 C 10 14, 14 10, 18 10 H 76" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
            <path d="M16 44 Q 16 16 44 16 Q 28 24 24 28 Q 20 32 16 44 Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />
            <circle cx="14" cy="14" r="3" fill={color} />
            <circle cx="26" cy="26" r="2" fill={color} />
          </>
        ) : themeId === 'emerald_garden' ? (
          <>
            {/* Botanical Corner Leaves */}
            <path d="M6 72 C 6 32, 32 6, 72 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M14 48 Q 8 36 20 32 Q 24 44 14 48 Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
            <path d="M32 24 Q 36 12 48 16 Q 44 28 32 24 Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
            <circle cx="16" cy="16" r="3" fill={color} />
          </>
        ) : themeId === 'romantic_rose' ? (
          <>
            {/* Soft Floral Scroll */}
            <path d="M6 72 V 28 C 6 14, 14 6, 28 6 H 72" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="20" cy="20" r="6" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.2" />
            <circle cx="20" cy="20" r="2.5" fill={color} />
            <path d="M28 16 Q 36 12 38 20" stroke={color} strokeWidth="1.2" />
            <path d="M16 28 Q 12 36 20 38" stroke={color} strokeWidth="1.2" />
          </>
        ) : (
          <>
            {/* Outer thick royal curve */}
            <path
              d="M4 76 V 24 C 4 13, 13 4, 24 4 H 76"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10 76 V 28 C 10 18, 18 10, 28 10 H 76"
              stroke={color}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path
              d="M24 24 C 24 16, 16 24, 16 16 C 16 10, 24 16, 30 16"
              stroke={color}
              strokeWidth="1.5"
            />
            <path
              d="M28 28 C 36 24, 28 36, 36 36 C 42 36, 36 28, 36 22"
              stroke={color}
              strokeWidth="1.2"
            />
            <circle cx="24" cy="24" r="3.5" fill={color} />
            <circle cx="10" cy="10" r="1.5" fill={color} />
          </>
        )}
      </svg>
    </div>
  );
}

/**
 * Royal Top & Bottom Arch Frame tailored per theme
 */
export function RoyalArchFrame({ color = '#B69A72', themeId = 'champagne_gold' }: { color?: string; themeId?: string }) {
  return (
    <div className="absolute inset-x-0 top-0 pointer-events-none z-10 flex flex-col items-center">
      <svg className="w-full max-w-xl h-14 sm:h-20 opacity-85" viewBox="0 0 600 70" fill="none" preserveAspectRatio="none">
        {themeId === 'javanese_heritage' ? (
          <>
            {/* Keraton Pendopo Arch */}
            <path d="M0 0 H 600 V 14 C 460 14, 390 58, 300 62 C 210 58, 140 14, 0 14 Z" fill={color} fillOpacity="0.12" />
            <path d="M0 14 C 140 14, 210 58, 300 62 C 390 58, 460 14, 600 14" stroke={color} strokeWidth="2" />
            <path d="M0 20 C 140 20, 210 62, 300 66 C 390 62, 460 20, 600 20" stroke={color} strokeWidth="1" strokeDasharray="4 3" opacity="0.75" />
            <path d="M294 56 L 300 46 L 306 56 L 300 66 Z" fill={color} />
          </>
        ) : (
          <>
            <path d="M0 0 H 600 V 12 C 450 12, 380 48, 300 48 C 220 48, 150 12, 0 12 Z" fill={color} fillOpacity="0.08" />
            <path d="M0 8 H 600" stroke={color} strokeWidth="1" opacity="0.6" />
            <path d="M0 14 C 150 14, 220 50, 300 50 C 380 50, 450 14, 600 14" stroke={color} strokeWidth="1.8" />
            <path d="M0 18 C 150 18, 220 54, 300 54 C 380 54, 450 18, 600 18" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />
            <circle cx="300" cy="52" r="4" fill={color} />
          </>
        )}
      </svg>
    </div>
  );
}

/**
 * Nusantara Keraton Crown / Gunungan Header with Prada Gold filigree
 */
export function GununganHeritageMotif({ color = '#C29A42', className = '' }: FlourishProps) {
  return (
    <div className={`flex flex-col items-center justify-center my-3 select-none ${className}`}>
      <div className="relative">
        <svg className="w-24 h-32 sm:w-28 sm:h-36 opacity-95 drop-shadow-md animate-float-gentle" viewBox="0 0 100 140" fill="none">
          <path
            d="M50 5 C 28 38, 6 82, 6 122 C 22 134, 78 134, 94 122 C 94 82, 72 38, 50 5 Z"
            stroke={color}
            strokeWidth="2.5"
            fill={color}
            fillOpacity="0.14"
          />
          <path
            d="M50 12 C 32 42, 12 84, 12 118 C 26 128, 74 128, 88 118 C 88 84, 68 42, 50 12 Z"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <path d="M50 125 V 28" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M50 48 Q 32 42, 24 58 Q 36 56, 50 62" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.22" />
          <path d="M50 48 Q 68 42, 76 58 Q 64 56, 50 62" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.22" />
          <path d="M50 72 Q 26 66, 16 85 Q 32 82, 50 88" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.22" />
          <path d="M50 72 Q 74 66, 84 85 Q 68 82, 50 88" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.22" />
          <path d="M50 96 Q 22 92, 12 112 Q 30 108, 50 114" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.22" />
          <path d="M50 96 Q 78 92, 88 112 Q 70 108, 50 114" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.22" />
          <circle cx="50" cy="18" r="4" fill={color} />
          <circle cx="50" cy="8" r="2.5" fill={color} />
        </svg>
      </div>

      <div className="flex items-center gap-2 mt-1.5 opacity-90">
        <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C29A42]" />
        <span className="text-[10px] tracking-[0.3em] font-serif uppercase font-bold" style={{ color }}>
          Kidung Penganten
        </span>
        <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C29A42]" />
      </div>
    </div>
  );
}

/**
 * Botanical Leaf Crest
 */
export function BotanicalHeaderMotif({ color = '#214B3B', className = '' }: FlourishProps) {
  return (
    <div className={`flex items-center justify-center my-3 select-none ${className}`}>
      <svg className="w-40 h-12 opacity-90 drop-shadow-sm" viewBox="0 0 160 44" fill="none">
        <path d="M80 22 C 66 18, 48 15, 10 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M48 19 Q 54 10 62 18" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.35" />
        <path d="M34 20 Q 40 11 48 19" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.35" />
        <path d="M20 21 Q 26 12 34 20" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.35" />

        <circle cx="80" cy="22" r="4.5" fill={color} />
        <circle cx="80" cy="22" r="8.5" stroke={color} strokeWidth="1" strokeDasharray="2 2" />

        <path d="M80 22 C 94 18, 112 15, 150 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M112 19 Q 106 10 98 18" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.35" />
        <path d="M126 20 Q 120 11 112 19" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.35" />
        <path d="M140 21 Q 134 12 126 20" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.35" />
      </svg>
    </div>
  );
}

/**
 * Celestial Moon & Star Crest for Midnight Theme
 */
export function CelestialCrest({ color = '#D4AF37', className = '' }: FlourishProps) {
  return (
    <div className={`flex items-center justify-center my-3 select-none ${className}`}>
      <svg className="w-32 h-20 opacity-95 drop-shadow-md" viewBox="0 0 120 80" fill="none">
        <path
          d="M60 14 C 48 14, 38 24, 38 36 C 38 48, 48 58, 60 58 C 54 53, 50 45, 50 36 C 50 27, 54 19, 60 14 Z"
          stroke={color}
          strokeWidth="1.8"
          fill={color}
          fillOpacity="0.35"
        />
        <path
          d="M68 26 L 71 33 L 78 36 L 71 39 L 68 46 L 65 39 L 58 36 L 65 33 Z"
          fill={color}
          className="animate-pulse-glow"
        />
        <circle cx="22" cy="36" r="2" fill={color} opacity="0.8" />
        <circle cx="98" cy="36" r="2" fill={color} opacity="0.8" />
        <circle cx="60" cy="70" r="2" fill={color} opacity="0.8" />
        <path d="M10 36 H 32" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        <path d="M88 36 H 110" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      </svg>
    </div>
  );
}

/**
 * Rose Bloom Filigree for Romantic Rose Theme
 */
export function RoseFiligree({ color = '#C77B8C', className = '' }: FlourishProps) {
  return (
    <div className={`flex items-center justify-center my-3 select-none ${className}`}>
      <svg className="w-32 h-16 opacity-95 drop-shadow-sm" viewBox="0 0 120 60" fill="none">
        <circle cx="60" cy="30" r="7" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.25" />
        <path d="M54 30 C 54 24, 66 24, 66 30 C 66 36, 54 36, 54 30" stroke={color} strokeWidth="1.2" />
        <path d="M50 26 C 47 17, 73 17, 70 26" stroke={color} strokeWidth="1.5" />
        <path d="M48 34 C 45 44, 75 44, 72 34" stroke={color} strokeWidth="1.5" />

        <path d="M46 30 C 32 27, 20 33, 10 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M25 29 Q 22 22 28 25" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.3" />

        <path d="M74 30 C 88 27, 100 33, 110 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M95 29 Q 98 22 92 25" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.3" />

        <circle cx="10" cy="30" r="2.5" fill={color} />
        <circle cx="110" cy="30" r="2.5" fill={color} />
      </svg>
    </div>
  );
}

/**
 * Per-Theme Opening Transition Curtain / Gate Overlay
 * Triggered when `isOpening` is true before cover disappears
 */
export function ThemeOpeningOverlay({
  transitionType,
  accentColor,
  isOpening,
}: {
  transitionType: OpeningTransitionType;
  accentColor: string;
  isOpening: boolean;
}) {
  if (!isOpening) return null;

  if (transitionType === 'keraton_gate' || transitionType === 'garden_gate' || transitionType === 'satin_curtain') {
    const isKeraton = transitionType === 'keraton_gate';
    const isGarden = transitionType === 'garden_gate';
    const panelBg = isKeraton
      ? 'linear-gradient(135deg, #3A1D12 0%, #5B2E1A 50%, #3A1D12 100%)'
      : isGarden
      ? 'linear-gradient(135deg, #122B20 0%, #214B3B 50%, #122B20 100%)'
      : 'linear-gradient(135deg, #2B2318 0%, #4A3C29 50%, #2B2318 100%)';

    return (
      <div className="fixed inset-0 z-[60] pointer-events-none flex overflow-hidden">
        {/* Left Gate / Curtain */}
        <div
          className="w-1/2 h-full relative border-r-2 flex items-center justify-end pr-4 animate-gate-open-left"
          style={{ background: panelBg, borderColor: accentColor }}
        >
          <div className="w-2 h-24 rounded-full opacity-80" style={{ backgroundColor: accentColor }} />
        </div>
        {/* Right Gate / Curtain */}
        <div
          className="w-1/2 h-full relative border-l-2 flex items-center justify-start pl-4 animate-gate-open-right"
          style={{ background: panelBg, borderColor: accentColor }}
        >
          <div className="w-2 h-24 rounded-full opacity-80" style={{ backgroundColor: accentColor }} />
        </div>
      </div>
    );
  }

  if (transitionType === 'celestial_portal') {
    return (
      <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center overflow-hidden">
        <div
          className="w-24 h-24 rounded-full animate-celestial-burst"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, rgba(212,175,55,0.4) 40%, transparent 75%)`,
          }}
        />
      </div>
    );
  }

  // floral_parting
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none flex overflow-hidden">
      <div
        className="w-1/2 h-full animate-gate-open-left"
        style={{ background: 'linear-gradient(to right, #4A1D2B, #8F3950)' }}
      />
      <div
        className="w-1/2 h-full animate-gate-open-right"
        style={{ background: 'linear-gradient(to left, #4A1D2B, #8F3950)' }}
      />
    </div>
  );
}

/**
 * Floating decorative ambient particles / petals based on theme
 * Optimized count for mobile 60fps performance
 */
export function ThemeParticleOverlay({ themeId = 'champagne_gold' }: { themeId?: string }) {
  if (themeId === 'midnight_celestial') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200 animate-star-twinkle"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 19 + 5) % 96}%`,
              left: `${(i * 23 + 7) % 96}%`,
              animationDelay: `${(i * 0.4).toFixed(1)}s`,
              animationDuration: `${2.5 + (i % 3)}s`,
              opacity: 0.8,
              boxShadow: '0 0 6px rgba(254, 240, 138, 0.9)',
            }}
          />
        ))}
      </div>
    );
  }

  if (themeId === 'romantic_rose') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-0 select-none pointer-events-none"
            style={{
              left: `${(i * 11 + 4) % 94}%`,
              animation: `petalDrift ${9 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 1.3).toFixed(1)}s`,
            }}
          >
            <svg className="w-4 h-4 text-rose-400 opacity-60 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8 6 4 12 12 22C20 12 16 6 12 2Z" />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (themeId === 'emerald_garden') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-0 select-none pointer-events-none"
            style={{
              left: `${(i * 13 + 5) % 92}%`,
              animation: `petalDrift ${11 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 1.6).toFixed(1)}s`,
            }}
          >
            <svg className="w-4 h-4 text-emerald-700 opacity-45 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5 19 5 19C5 19 14 16 16 7C17 2 17 2 17 8Z" />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (themeId === 'javanese_heritage') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C29A42] animate-prada-sparkle"
            style={{
              width: `${(i % 3) + 2.5}px`,
              height: `${(i % 3) + 2.5}px`,
              top: `${(i * 15 + 5) % 96}%`,
              left: `${(i * 19 + 7) % 94}%`,
              animationDelay: `${(i * 0.5).toFixed(1)}s`,
              animationDuration: `${3 + (i % 2)}s`,
              opacity: 0.7,
              boxShadow: '0 0 8px rgba(194, 154, 66, 0.75)',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#C5A46D] animate-pulse-glow"
          style={{
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`,
            top: `${(i * 17 + 4) % 96}%`,
            left: `${(i * 21 + 6) % 95}%`,
            animationDelay: `${(i * 0.4).toFixed(1)}s`,
            animationDuration: `${3.5 + (i % 2)}s`,
            opacity: 0.65,
            boxShadow: '0 0 6px rgba(197, 164, 109, 0.65)',
          }}
        />
      ))}
    </div>
  );
}

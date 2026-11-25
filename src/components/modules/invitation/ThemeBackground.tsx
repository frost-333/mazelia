import * as React from 'react';
import { WeddingThemeId } from '@/lib/constants/themes';

interface ThemeBackgroundProps {
  themeId: WeddingThemeId | string;
  isCover?: boolean;
}

export function ThemeBackground({ themeId, isCover = false }: ThemeBackgroundProps) {
  switch (themeId) {
    case 'midnight_celestial':
      return <MidnightCelestialBackground isCover={isCover} />;
    case 'javanese_heritage':
      return <JavaneseHeritageBackground isCover={isCover} />;
    case 'romantic_rose':
      return <RomanticRoseBackground isCover={isCover} />;
    case 'emerald_garden':
      return <EmeraldGardenBackground isCover={isCover} />;
    case 'champagne_gold':
    default:
      return <ChampagneRoyaleBackground isCover={isCover} />;
  }
}

/* ===========================================================================
   1. CHAMPAGNE ROYALE — Luxury ballroom, satin fabric, damask, chandeliers
   =========================================================================== */
function ChampagneRoyaleBackground({ isCover }: { isCover?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Satin silk fabric texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(182,154,114,0.1) 20px, rgba(182,154,114,0.1) 21px),
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(212,175,55,0.08) 20px, rgba(212,175,55,0.08) 21px)
          `,
        }}
      />

      {/* Damask brocade pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 18px 24px at 50% 50%, #B69A72 0%, transparent 70%),
            radial-gradient(ellipse 10px 14px at 25% 25%, #D4AF37 0%, transparent 60%),
            radial-gradient(ellipse 10px 14px at 75% 75%, #D4AF37 0%, transparent 60%)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top chandelier warm radiance */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full blur-[80px] opacity-50 animate-pulse-glow"
        style={{ background: 'radial-gradient(ellipse, #F5E6C8 0%, rgba(212,175,55,0.2) 50%, transparent 100%)' }}
      />

      {/* Left ambient glow */}
      <div
        className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full blur-[60px] opacity-30 animate-float-gentle"
        style={{ background: 'radial-gradient(circle, #E8D5A8 0%, transparent 70%)', animationDuration: '9s' }}
      />

      {/* Right ambient glow */}
      <div
        className="absolute bottom-1/4 -right-24 w-[350px] h-[350px] rounded-full blur-[60px] opacity-25 animate-float-gentle"
        style={{ background: 'radial-gradient(circle, #D4C49A 0%, transparent 70%)', animationDuration: '11s', animationDelay: '2s' }}
      />

      {/* Top decorative swag / curtain garland */}
      <div className="absolute top-0 inset-x-0 h-20 opacity-25">
        <svg className="w-full h-20" viewBox="0 0 800 80" fill="none" preserveAspectRatio="none">
          <path d="M0 0 C 100 60, 200 65, 300 40 C 400 15, 500 15, 600 40 C 700 65, 800 60, 800 0" fill="url(#swagGrad)" />
          <path d="M0 5 C 100 55, 200 58, 300 38 C 400 18, 500 18, 600 38 C 700 58, 800 55, 800 5" stroke="#B69A72" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <defs>
            <linearGradient id="swagGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B69A72" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#B69A72" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Thin gold decorative frame border */}
      <div className="absolute inset-4 sm:inset-6 border border-[#B69A72]/10 rounded-3xl pointer-events-none" />
      <div className="absolute inset-6 sm:inset-8 border border-[#D4AF37]/[0.06] rounded-2xl pointer-events-none" style={{ borderStyle: 'dashed' }} />

      {/* Bottom floral corner ornaments */}
      <div className="absolute bottom-0 left-0 w-36 h-36 opacity-15 text-[#B69A72]">
        <svg viewBox="0 0 140 140" fill="currentColor">
          <path d="M0 140 C 20 100, 50 80, 90 70 C 70 90, 40 110, 0 140 Z" opacity="0.5" />
          <path d="M0 140 C 30 120, 60 100, 110 90 C 80 105, 50 120, 0 140 Z" opacity="0.3" />
          <circle cx="70" cy="90" r="4" />
          <circle cx="50" cy="110" r="3" />
          <circle cx="30" cy="125" r="2" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-36 h-36 opacity-15 text-[#B69A72] scale-x-[-1]">
        <svg viewBox="0 0 140 140" fill="currentColor">
          <path d="M0 140 C 20 100, 50 80, 90 70 C 70 90, 40 110, 0 140 Z" opacity="0.5" />
          <path d="M0 140 C 30 120, 60 100, 110 90 C 80 105, 50 120, 0 140 Z" opacity="0.3" />
          <circle cx="70" cy="90" r="4" />
          <circle cx="50" cy="110" r="3" />
        </svg>
      </div>

      {/* Top floral corner ornaments */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20 text-[#B69A72] animate-float-gentle" style={{ animationDuration: '7s' }}>
        <svg viewBox="0 0 120 120" fill="currentColor">
          <path d="M0 0 C 30 10, 60 25, 80 60 C 55 45, 25 25, 0 0 Z" opacity="0.4" />
          <path d="M0 0 C 15 20, 35 45, 50 80 C 30 60, 10 35, 0 0 Z" opacity="0.3" />
          <circle cx="40" cy="40" r="5" opacity="0.5" />
          <circle cx="20" cy="20" r="3" opacity="0.4" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 text-[#B69A72] scale-x-[-1] animate-float-gentle" style={{ animationDuration: '8s', animationDelay: '1s' }}>
        <svg viewBox="0 0 120 120" fill="currentColor">
          <path d="M0 0 C 30 10, 60 25, 80 60 C 55 45, 25 25, 0 0 Z" opacity="0.4" />
          <path d="M0 0 C 15 20, 35 45, 50 80 C 30 60, 10 35, 0 0 Z" opacity="0.3" />
          <circle cx="40" cy="40" r="5" opacity="0.5" />
        </svg>
      </div>

      {/* Satin shimmer sweep */}
      <div className="absolute inset-0 animate-satin-shimmer opacity-40" />

      {/* Floating golden dust particles rising */}
      {[...Array(isCover ? 22 : 16)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-gold-dust"
          style={{
            width: `${(i % 4) + 2}px`,
            height: `${(i % 4) + 2}px`,
            bottom: `-10px`,
            left: `${(i * 11 + 5) % 94}%`,
            animationDelay: `${(i * 0.8).toFixed(1)}s`,
            animationDuration: `${10 + (i % 5) * 2}s`,
            background: i % 3 === 0 ? '#D4AF37' : '#B69A72',
            boxShadow: `0 0 ${4 + (i % 3) * 2}px rgba(212, 175, 55, 0.6)`,
          }}
        />
      ))}
    </div>
  );
}

/* ===========================================================================
   2. EMERALD BOTANICAL — Enchanted garden, lush foliage, sunlight, fireflies
   =========================================================================== */
function EmeraldGardenBackground({ isCover }: { isCover?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Soft botanical texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 12px 20px at 50% 50%, #2D6B4C 0%, transparent 70%),
            radial-gradient(ellipse 8px 12px at 30% 70%, #1A5C3A 0%, transparent 60%)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Sunlight rays from top-right */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[700px] opacity-[0.08] animate-sunbeam" style={{ animationDuration: '8s' }}>
        <div className="w-full h-full" style={{
          background: 'conic-gradient(from 200deg at 100% 0%, transparent 0deg, rgba(185,164,119,0.4) 15deg, transparent 30deg, transparent 50deg, rgba(185,164,119,0.2) 65deg, transparent 80deg)',
        }} />
      </div>

      {/* Dappled sunlight scattered */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[450px] rounded-full blur-[70px] opacity-35 animate-pulse-glow"
        style={{ background: 'radial-gradient(ellipse, #A8D5A0 0%, rgba(35,75,55,0.2) 60%, transparent 100%)' }}
      />
      <div
        className="absolute top-1/2 -left-32 w-[380px] h-[380px] rounded-full blur-[60px] opacity-25 animate-float-gentle"
        style={{ background: 'radial-gradient(circle, #7FB98B 0%, transparent 70%)', animationDuration: '10s' }}
      />
      <div
        className="absolute bottom-1/3 -right-28 w-[350px] h-[350px] rounded-full blur-[60px] opacity-20 animate-float-gentle"
        style={{ background: 'radial-gradient(circle, #5D987B 0%, transparent 70%)', animationDuration: '12s', animationDelay: '2s' }}
      />

      {/* Top-left hanging botanical branch with leaves */}
      <div className="absolute top-0 left-0 w-56 h-56 opacity-30 text-emerald-900 animate-leaf-sway" style={{ animationDuration: '6s', transformOrigin: 'top left' }}>
        <svg viewBox="0 0 200 200" fill="currentColor">
          {/* Main branch */}
          <path d="M0 0 C 20 30, 50 70, 65 120 C 70 135, 68 150, 60 170" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.6" />
          {/* Leaves off branch */}
          <path d="M15 25 C 25 15, 40 18, 35 30 C 28 35, 12 32, 15 25 Z" opacity="0.5" />
          <path d="M30 50 C 45 38, 58 45, 50 58 C 42 62, 28 56, 30 50 Z" opacity="0.4" />
          <path d="M42 78 C 58 68, 72 75, 62 88 C 55 92, 40 86, 42 78 Z" opacity="0.5" />
          <path d="M50 105 C 65 95, 78 100, 70 115 C 62 118, 48 112, 50 105 Z" opacity="0.35" />
          <path d="M55 135 C 68 125, 80 132, 72 145 C 65 148, 52 142, 55 135 Z" opacity="0.3" />
          {/* Small berries */}
          <circle cx="20" cy="30" r="2" opacity="0.3" />
          <circle cx="48" cy="85" r="2.5" opacity="0.25" />
        </svg>
      </div>

      {/* Top-right hanging botanical branch */}
      <div className="absolute top-0 right-0 w-56 h-56 opacity-30 text-emerald-900 scale-x-[-1] animate-leaf-sway" style={{ animationDuration: '7s', animationDelay: '1s', transformOrigin: 'top right' }}>
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M0 0 C 20 30, 50 70, 65 120 C 70 135, 68 150, 60 170" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.6" />
          <path d="M15 25 C 25 15, 40 18, 35 30 C 28 35, 12 32, 15 25 Z" opacity="0.5" />
          <path d="M30 50 C 45 38, 58 45, 50 58 C 42 62, 28 56, 30 50 Z" opacity="0.4" />
          <path d="M42 78 C 58 68, 72 75, 62 88 C 55 92, 40 86, 42 78 Z" opacity="0.5" />
          <path d="M50 105 C 65 95, 78 100, 70 115 C 62 118, 48 112, 50 105 Z" opacity="0.35" />
          <path d="M55 135 C 68 125, 80 132, 72 145 C 65 148, 52 142, 55 135 Z" opacity="0.3" />
          <circle cx="20" cy="30" r="2" opacity="0.3" />
        </svg>
      </div>

      {/* Bottom wisteria vine decorations */}
      <div className="absolute bottom-0 left-0 w-40 h-48 opacity-20 text-emerald-800 scale-y-[-1] animate-leaf-sway" style={{ animationDuration: '8s', animationDelay: '2s', transformOrigin: 'bottom left' }}>
        <svg viewBox="0 0 160 200" fill="currentColor">
          <path d="M0 0 C 15 25, 40 50, 55 90 C 60 105, 55 120, 48 140" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M12 20 C 22 12, 32 16, 28 26 C 22 30, 10 26, 12 20 Z" opacity="0.4" />
          <path d="M32 55 C 44 46, 55 52, 48 62 C 42 65, 30 60, 32 55 Z" opacity="0.35" />
          <path d="M42 85 C 52 76, 62 82, 55 92 C 48 95, 40 90, 42 85 Z" opacity="0.3" />
        </svg>
      </div>

      {/* Vine border on sides */}
      <div className="absolute top-20 bottom-20 left-0 w-5 opacity-15 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <svg key={i} className="w-5 h-16 text-emerald-800 animate-leaf-sway" viewBox="0 0 20 60" fill="currentColor" style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${5 + i % 3}s` }}>
            <path d="M10 0 V 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M10 10 C 2 5, 0 12, 6 15" opacity="0.5" />
            <path d="M10 30 C 18 25, 20 32, 14 35" opacity="0.5" />
            <path d="M10 50 C 2 45, 0 52, 6 55" opacity="0.4" />
          </svg>
        ))}
      </div>
      <div className="absolute top-20 bottom-20 right-0 w-5 opacity-15 overflow-hidden scale-x-[-1]">
        {[...Array(8)].map((_, i) => (
          <svg key={i} className="w-5 h-16 text-emerald-800 animate-leaf-sway" viewBox="0 0 20 60" fill="currentColor" style={{ animationDelay: `${i * 0.6}s`, animationDuration: `${6 + i % 3}s` }}>
            <path d="M10 0 V 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M10 10 C 2 5, 0 12, 6 15" opacity="0.5" />
            <path d="M10 30 C 18 25, 20 32, 14 35" opacity="0.5" />
          </svg>
        ))}
      </div>

      {/* Falling leaves */}
      {[...Array(isCover ? 14 : 10)].map((_, i) => (
        <div
          key={`leaf-${i}`}
          className="absolute opacity-0 pointer-events-none"
          style={{
            left: `${(i * 14 + 6) % 94}%`,
            animation: `petalDrift ${10 + (i % 5) * 2}s ease-in-out infinite`,
            animationDelay: `${(i * 1.5).toFixed(1)}s`,
          }}
        >
          <svg className="w-5 h-5 text-emerald-700 opacity-40 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5 19 5 19C5 19 14 16 16 7C17 2 17 2 17 8Z" />
          </svg>
        </div>
      ))}

      {/* Fireflies */}
      {[...Array(isCover ? 12 : 8)].map((_, i) => (
        <div
          key={`ff-${i}`}
          className="absolute rounded-full animate-firefly"
          style={{
            width: `${(i % 3) + 3}px`,
            height: `${(i % 3) + 3}px`,
            top: `${(i * 19 + 10) % 90}%`,
            left: `${(i * 23 + 8) % 88}%`,
            animationDelay: `${(i * 0.7).toFixed(1)}s`,
            animationDuration: `${3 + (i % 4)}s`,
            background: '#BFA678',
            boxShadow: '0 0 8px rgba(191, 166, 120, 0.8)',
          }}
        />
      ))}
    </div>
  );
}

/* ===========================================================================
   3. ROMANTIC ROSE & BLUSH — Floral arch, rose petals, bokeh, hearts
   =========================================================================== */
function RomanticRoseBackground({ isCover }: { isCover?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Soft blush-to-ivory gradient wash */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'linear-gradient(170deg, rgba(247,218,224,0.4) 0%, rgba(255,249,246,0.1) 40%, rgba(251,240,242,0.3) 100%)',
        }}
      />

      {/* Watercolor texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 40px 50px at 30% 20%, #E7B6C1 0%, transparent 70%),
            radial-gradient(ellipse 30px 40px at 70% 60%, #C77B8C 0%, transparent 70%),
            radial-gradient(ellipse 50px 35px at 50% 80%, #F4DDE2 0%, transparent 70%)
          `,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Top-center warm blush radiance */}
      <div
        className="absolute -top-28 left-1/2 -translate-x-1/2 w-[550px] h-[450px] rounded-full blur-[70px] opacity-45 animate-pulse-glow"
        style={{ background: 'radial-gradient(ellipse, #F8CCD5 0%, rgba(199,123,140,0.25) 55%, transparent 100%)' }}
      />

      {/* Right blush glow */}
      <div
        className="absolute top-1/3 -right-28 w-[380px] h-[380px] rounded-full blur-[60px] opacity-30 animate-float-gentle"
        style={{ background: 'radial-gradient(circle, #FADBE1 0%, transparent 70%)', animationDuration: '10s' }}
      />

      {/* Left rose gold glow */}
      <div
        className="absolute bottom-1/4 -left-24 w-[350px] h-[350px] rounded-full blur-[60px] opacity-25 animate-float-gentle"
        style={{ background: 'radial-gradient(circle, #ECA1B2 0%, transparent 70%)', animationDuration: '12s', animationDelay: '2s' }}
      />

      {/* Top-left rose bouquet arrangement */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-25 text-rose-800">
        <svg viewBox="0 0 180 180" fill="currentColor">
          {/* Rose blooms */}
          <circle cx="40" cy="35" r="22" opacity="0.4" />
          <circle cx="30" cy="45" r="16" opacity="0.3" />
          <circle cx="55" cy="28" r="14" opacity="0.35" />
          <circle cx="65" cy="50" r="12" opacity="0.25" />
          <circle cx="20" cy="60" r="10" opacity="0.3" />
          {/* Curved stem */}
          <path d="M45 55 C 65 80, 90 110, 130 150" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M30 60 C 45 85, 70 115, 100 155" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
          {/* Leaves */}
          <path d="M70 75 C 85 65, 95 72, 82 85 C 72 88, 65 82, 70 75 Z" opacity="0.2" />
          <path d="M55 90 C 68 82, 76 88, 65 98 C 58 100, 50 95, 55 90 Z" opacity="0.15" />
        </svg>
      </div>

      {/* Top-right rose bouquet */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-25 text-rose-800 scale-x-[-1]">
        <svg viewBox="0 0 180 180" fill="currentColor">
          <circle cx="40" cy="35" r="22" opacity="0.4" />
          <circle cx="30" cy="45" r="16" opacity="0.3" />
          <circle cx="55" cy="28" r="14" opacity="0.35" />
          <circle cx="65" cy="50" r="12" opacity="0.25" />
          <path d="M45 55 C 65 80, 90 110, 130 150" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M70 75 C 85 65, 95 72, 82 85 C 72 88, 65 82, 70 75 Z" opacity="0.2" />
        </svg>
      </div>

      {/* Bottom rose arrangements */}
      <div className="absolute bottom-0 left-0 w-40 h-40 opacity-20 text-rose-700 scale-y-[-1]">
        <svg viewBox="0 0 160 160" fill="currentColor">
          <circle cx="35" cy="30" r="18" opacity="0.35" />
          <circle cx="55" cy="25" r="12" opacity="0.3" />
          <circle cx="22" cy="48" r="10" opacity="0.25" />
          <path d="M40 48 C 55 70, 75 95, 110 130" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20 text-rose-700 scale-y-[-1] scale-x-[-1]">
        <svg viewBox="0 0 160 160" fill="currentColor">
          <circle cx="35" cy="30" r="18" opacity="0.35" />
          <circle cx="55" cy="25" r="12" opacity="0.3" />
          <path d="M40 48 C 55 70, 75 95, 110 130" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
        </svg>
      </div>

      {/* Rose gold decorative border lines */}
      <div className="absolute inset-5 sm:inset-7 border border-[#C99A91]/10 rounded-3xl" />

      {/* Romantic bokeh orbs */}
      {[...Array(isCover ? 10 : 7)].map((_, i) => (
        <div
          key={`bokeh-${i}`}
          className="absolute rounded-full animate-bokeh"
          style={{
            width: `${12 + (i % 5) * 6}px`,
            height: `${12 + (i % 5) * 6}px`,
            top: `${(i * 18 + 10) % 85}%`,
            left: `${(i * 22 + 8) % 88}%`,
            animationDelay: `${(i * 1.2).toFixed(1)}s`,
            animationDuration: `${7 + (i % 4) * 2}s`,
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(199,123,140,0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(201,154,145,0.2) 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Small floating hearts */}
      {[...Array(isCover ? 6 : 4)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute animate-heart-pulse"
          style={{
            top: `${20 + (i * 25) % 70}%`,
            left: `${10 + (i * 30) % 80}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
        >
          <svg className="w-4 h-4 text-rose-400 opacity-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Falling rose petals */}
      {[...Array(isCover ? 18 : 12)].map((_, i) => (
        <div
          key={`petal-${i}`}
          className="absolute opacity-0 pointer-events-none"
          style={{
            left: `${(i * 11 + 5) % 94}%`,
            animation: `petalDrift ${8 + (i % 5) * 2}s ease-in-out infinite`,
            animationDelay: `${(i * 1.0).toFixed(1)}s`,
          }}
        >
          <svg className={`w-${3 + (i % 3)} h-${3 + (i % 3)} drop-shadow`} style={{ width: `${12 + (i % 3) * 4}px`, height: `${12 + (i % 3) * 4}px` }} viewBox="0 0 24 24" fill={i % 3 === 0 ? '#D48C9E' : i % 3 === 1 ? '#C77B8C' : '#E7B6C1'}>
            <path d="M12 2C8 6 4 12 12 22C20 12 16 6 12 2Z" opacity="0.6" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ===========================================================================
   4. ROYAL HERITAGE NUSANTARA — Keraton, batik parang, kawung, prada gold
   =========================================================================== */
function JavaneseHeritageBackground({ isCover }: { isCover?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Batik Parang Rusak diagonal pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 14px, rgba(195,155,66,0.15) 14px, rgba(195,155,66,0.15) 15px),
            repeating-linear-gradient(-45deg, transparent, transparent 14px, rgba(122,63,30,0.1) 14px, rgba(122,63,30,0.1) 15px)
          `,
        }}
      />

      {/* Kawung pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            radial-gradient(circle 8px at 50% 50%, #C39B42 0%, transparent 100%),
            radial-gradient(circle 5px at 25% 25%, rgba(122,63,30,0.5) 0%, transparent 100%),
            radial-gradient(circle 5px at 75% 75%, rgba(122,63,30,0.5) 0%, transparent 100%),
            radial-gradient(circle 5px at 25% 75%, rgba(122,63,30,0.5) 0%, transparent 100%),
            radial-gradient(circle 5px at 75% 25%, rgba(122,63,30,0.5) 0%, transparent 100%)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Royal warm golden radiance from top */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[580px] h-[480px] rounded-full blur-[80px] opacity-40 animate-pulse-glow"
        style={{ background: 'radial-gradient(ellipse, #E5C365 0%, rgba(195,155,66,0.25) 50%, rgba(122,63,30,0.1) 80%, transparent 100%)' }}
      />

      {/* Left & right warm glows */}
      <div
        className="absolute top-1/2 -left-32 w-[380px] h-[380px] rounded-full blur-[60px] opacity-30 animate-float-gentle"
        style={{ background: 'radial-gradient(circle, #C39B42 0%, rgba(122,63,30,0.15) 65%, transparent 100%)', animationDuration: '9s' }}
      />
      <div
        className="absolute top-2/3 -right-32 w-[380px] h-[380px] rounded-full blur-[60px] opacity-25 animate-float-gentle"
        style={{ background: 'radial-gradient(circle, #E5C365 0%, rgba(195,155,66,0.15) 65%, transparent 100%)', animationDuration: '11s', animationDelay: '2s' }}
      />

      {/* Left Keraton pillar border with ukiran */}
      <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-14 opacity-25 text-[#C39B42] flex flex-col justify-around overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-12 h-40 shrink-0" viewBox="0 0 48 160" fill="currentColor">
            <rect x="0" y="0" width="8" height="160" opacity="0.3" />
            <path d="M8 0 H 20 Q 40 20, 20 40 Q 40 60, 20 80 Q 40 100, 20 120 Q 40 140, 20 160 H 8 Z" opacity="0.15" />
            <circle cx="24" cy="40" r="3" opacity="0.4" />
            <circle cx="24" cy="80" r="3" opacity="0.4" />
            <circle cx="24" cy="120" r="3" opacity="0.4" />
            <path d="M20 20 L 28 20 L 24 12 Z" opacity="0.3" />
            <path d="M20 60 L 28 60 L 24 52 Z" opacity="0.3" />
            <path d="M20 100 L 28 100 L 24 92 Z" opacity="0.3" />
          </svg>
        ))}
      </div>

      {/* Right Keraton pillar border */}
      <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-14 opacity-25 text-[#C39B42] scale-x-[-1] flex flex-col justify-around overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-12 h-40 shrink-0" viewBox="0 0 48 160" fill="currentColor">
            <rect x="0" y="0" width="8" height="160" opacity="0.3" />
            <path d="M8 0 H 20 Q 40 20, 20 40 Q 40 60, 20 80 Q 40 100, 20 120 Q 40 140, 20 160 H 8 Z" opacity="0.15" />
            <circle cx="24" cy="40" r="3" opacity="0.4" />
            <circle cx="24" cy="80" r="3" opacity="0.4" />
            <circle cx="24" cy="120" r="3" opacity="0.4" />
          </svg>
        ))}
      </div>

      {/* Top gapura keraton arch */}
      <div className="absolute top-0 inset-x-0 h-24 opacity-20 text-[#C39B42]">
        <svg className="w-full h-24" viewBox="0 0 600 90" fill="none" preserveAspectRatio="none">
          {/* Arch shape */}
          <path d="M0 0 H 600 V 20 C 500 20, 420 70, 300 70 C 180 70, 100 20, 0 20 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M0 15 C 100 15, 180 65, 300 65 C 420 65, 500 15, 600 15" stroke="currentColor" strokeWidth="2" />
          <path d="M0 20 C 100 20, 180 70, 300 70 C 420 70, 500 20, 600 20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          {/* Center diamond jewel */}
          <path d="M295 65 L 300 55 L 305 65 L 300 72 Z" fill="currentColor" />
          {/* Side ornaments */}
          <circle cx="150" cy="30" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="450" cy="30" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* Grand center Gunungan watermark */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-72 h-[420px] opacity-[0.05] text-[#7A3F1E] animate-float-gentle" style={{ animationDuration: '8s' }}>
        <svg viewBox="0 0 100 140" fill="currentColor">
          <path d="M50 5 C 28 38, 6 82, 6 122 C 22 134, 78 134, 94 122 C 94 82, 72 38, 50 5 Z" />
        </svg>
      </div>

      {/* Traditional decorative frame */}
      <div className="absolute inset-5 sm:inset-8 border-2 border-[#C39B42]/[0.08] rounded-sm pointer-events-none" />
      <div className="absolute inset-7 sm:inset-10 border border-[#7A3F1E]/[0.06] rounded-sm pointer-events-none" style={{ borderStyle: 'dashed' }} />

      {/* Floating prada gold sparkles */}
      {[...Array(isCover ? 20 : 14)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-prada-sparkle"
          style={{
            width: `${(i % 4) + 2.5}px`,
            height: `${(i % 4) + 2.5}px`,
            top: `${(i * 13 + 6) % 96}%`,
            left: `${(i * 17 + 8) % 94}%`,
            animationDelay: `${(i * 0.5).toFixed(1)}s`,
            animationDuration: `${2 + (i % 3)}s`,
            background: i % 2 === 0 ? '#C39B42' : '#E5C365',
            boxShadow: `0 0 ${5 + (i % 3) * 2}px rgba(195, 155, 66, 0.7)`,
          }}
        />
      ))}
    </div>
  );
}

/* ===========================================================================
   5. MIDNIGHT CELESTIAL GLAM — Deep space, nebula, stars, moon, constellations
   =========================================================================== */
function MidnightCelestialBackground({ isCover }: { isCover?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Deep cosmic gradient layers */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #080E22 0%, #0D1733 30%, #111D3E 60%, #0B1329 100%)',
        }}
      />

      {/* Nebula cloud 1 — purple-blue */}
      <div
        className="absolute -top-32 -left-24 w-[550px] h-[550px] rounded-full blur-[80px] opacity-40 animate-nebula-shift"
        style={{
          background: 'radial-gradient(circle, rgba(88, 28, 135, 0.35) 0%, rgba(30, 58, 138, 0.25) 50%, transparent 100%)',
          animationDuration: '10s',
        }}
      />

      {/* Nebula cloud 2 — gold-blue */}
      <div
        className="absolute top-1/3 -right-28 w-[480px] h-[480px] rounded-full blur-[70px] opacity-35 animate-nebula-shift"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(30, 64, 175, 0.25) 60%, transparent 100%)',
          animationDuration: '12s',
          animationDelay: '3s',
        }}
      />

      {/* Nebula cloud 3 — deep purple bottom */}
      <div
        className="absolute bottom-1/4 -left-28 w-[450px] h-[450px] rounded-full blur-[70px] opacity-30 animate-nebula-shift"
        style={{
          background: 'radial-gradient(circle, rgba(109, 40, 217, 0.25) 0%, rgba(15, 23, 42, 0.3) 70%, transparent 100%)',
          animationDuration: '14s',
          animationDelay: '5s',
        }}
      />

      {/* Soft glowing moon */}
      <div className="absolute top-[8%] right-[12%] animate-moon-glow">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #F4F2EE 0%, #E6D6AD 40%, rgba(212,175,55,0.3) 70%, transparent 100%)',
            boxShadow: '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.15)',
          }}
        >
          {/* Moon craters */}
          <div className="absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-[#D4C49A] opacity-30" />
          <div className="absolute top-[55%] left-[50%] w-2 h-2 rounded-full bg-[#D4C49A] opacity-20" />
          <div className="absolute top-[20%] left-[55%] w-1.5 h-1.5 rounded-full bg-[#D4C49A] opacity-25" />
        </div>
      </div>

      {/* Constellation pattern SVG */}
      <div className="absolute top-[15%] left-[10%] w-48 h-48 opacity-30">
        <svg viewBox="0 0 200 200" fill="none" stroke="#D4AF37">
          <circle cx="30" cy="40" r="2" fill="#D4AF37" className="animate-star-twinkle" style={{ animationDelay: '0s' }} />
          <circle cx="80" cy="20" r="2.5" fill="#D4AF37" className="animate-star-twinkle" style={{ animationDelay: '0.5s' }} />
          <circle cx="120" cy="60" r="2" fill="#D4AF37" className="animate-star-twinkle" style={{ animationDelay: '1s' }} />
          <circle cx="90" cy="100" r="2" fill="#D4AF37" className="animate-star-twinkle" style={{ animationDelay: '1.5s' }} />
          <circle cx="150" cy="130" r="2.5" fill="#D4AF37" className="animate-star-twinkle" style={{ animationDelay: '2s' }} />
          <line x1="30" y1="40" x2="80" y2="20" strokeWidth="0.8" strokeDasharray="100" className="opacity-40" style={{ strokeDashoffset: '0' }} />
          <line x1="80" y1="20" x2="120" y2="60" strokeWidth="0.8" strokeDasharray="100" className="opacity-40" />
          <line x1="120" y1="60" x2="90" y2="100" strokeWidth="0.8" strokeDasharray="100" className="opacity-30" />
          <line x1="90" y1="100" x2="150" y2="130" strokeWidth="0.8" strokeDasharray="100" className="opacity-30" />
        </svg>
      </div>

      {/* Second constellation */}
      <div className="absolute bottom-[25%] right-[8%] w-36 h-36 opacity-25">
        <svg viewBox="0 0 150 150" fill="none" stroke="#E6D6AD">
          <circle cx="20" cy="30" r="2" fill="#E6D6AD" className="animate-star-twinkle" style={{ animationDelay: '1s' }} />
          <circle cx="70" cy="15" r="2" fill="#E6D6AD" className="animate-star-twinkle" style={{ animationDelay: '2s' }} />
          <circle cx="100" cy="50" r="2.5" fill="#E6D6AD" className="animate-star-twinkle" style={{ animationDelay: '0.5s' }} />
          <circle cx="60" cy="90" r="2" fill="#E6D6AD" className="animate-star-twinkle" style={{ animationDelay: '3s' }} />
          <line x1="20" y1="30" x2="70" y2="15" strokeWidth="0.8" className="opacity-30" />
          <line x1="70" y1="15" x2="100" y2="50" strokeWidth="0.8" className="opacity-30" />
          <line x1="100" y1="50" x2="60" y2="90" strokeWidth="0.8" className="opacity-25" />
        </svg>
      </div>

      {/* Metallic gold decorative frame */}
      <div className="absolute inset-4 sm:inset-6 border border-[#D4AF37]/[0.08] rounded-3xl" />

      {/* Orbital ring watermark */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] opacity-15 text-amber-200 animate-spin-slow" style={{ animationDuration: '60s' }}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <ellipse cx="50" cy="50" rx="46" ry="16" strokeWidth="0.8" strokeDasharray="4 4" />
          <ellipse cx="50" cy="50" rx="36" ry="12" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Shooting stars */}
      <div className="absolute top-[12%] left-[15%] w-[150px] h-[1.5px] bg-gradient-to-r from-transparent via-amber-200 to-transparent -rotate-45 opacity-0 animate-shooting-star" />
      <div className="absolute top-[35%] right-[10%] w-[180px] h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent -rotate-45 opacity-0 animate-shooting-star-delayed" />
      <div className="absolute top-[65%] left-[25%] w-[130px] h-[1.5px] bg-gradient-to-r from-transparent via-purple-200 to-transparent -rotate-45 opacity-0 animate-shooting-star" style={{ animationDelay: '8s' }} />

      {/* Twinkling stars — varied sizes, colors, timings */}
      {[...Array(isCover ? 35 : 25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-star-twinkle"
          style={{
            width: `${(i % 4) + 1.5}px`,
            height: `${(i % 4) + 1.5}px`,
            top: `${(i * 11 + 4) % 96}%`,
            left: `${(i * 17 + 7) % 95}%`,
            animationDelay: `${(i * 0.4).toFixed(1)}s`,
            animationDuration: `${2 + (i % 4)}s`,
            background: i % 5 === 0 ? '#D4AF37' : i % 5 === 1 ? '#E6D6AD' : i % 5 === 2 ? '#93C5FD' : i % 5 === 3 ? '#C4B5FD' : '#FEF08A',
            boxShadow: `0 0 ${3 + (i % 4) * 2}px ${i % 3 === 0 ? 'rgba(212,175,55,0.8)' : i % 3 === 1 ? 'rgba(147,197,253,0.6)' : 'rgba(196,181,253,0.6)'}`,
          }}
        />
      ))}

      {/* Cosmic dust particles floating upwards */}
      {[...Array(isCover ? 10 : 6)].map((_, i) => (
        <div
          key={`cd-${i}`}
          className="absolute rounded-full animate-cosmic-dust"
          style={{
            width: `${(i % 3) + 1.5}px`,
            height: `${(i % 3) + 1.5}px`,
            bottom: '0',
            left: `${(i * 18 + 10) % 90}%`,
            animationDelay: `${(i * 2).toFixed(0)}s`,
            animationDuration: `${12 + (i % 5) * 3}s`,
            background: i % 2 === 0 ? '#D4AF37' : '#E6D6AD',
            boxShadow: '0 0 6px rgba(212,175,55,0.5)',
          }}
        />
      ))}
    </div>
  );
}

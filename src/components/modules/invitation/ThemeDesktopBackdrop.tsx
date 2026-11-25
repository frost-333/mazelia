import * as React from 'react';
import { WeddingThemeConfig } from '@/lib/constants/themes';
import { formatDateIndo } from '@/lib/utils/formatters';

interface ThemeDesktopBackdropProps {
  theme: WeddingThemeConfig;
  groomNickname?: string;
  brideNickname?: string;
  ceremonyDate?: string;
}

/**
 * Full-bleed desktop & tablet outer backdrop that fills the left and right
 * areas outside the centered `max-w-2xl` invitation card so the stage never looks empty.
 */
export function ThemeDesktopBackdrop({
  theme,
  groomNickname = 'Groom',
  brideNickname = 'Bride',
  ceremonyDate,
}: ThemeDesktopBackdropProps) {
  const monogram = `${groomNickname?.[0] || 'G'} & ${brideNickname?.[0] || 'B'}`;
  const formattedDate = ceremonyDate ? formatDateIndo(ceremonyDate) : '';

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {theme.id === 'midnight_celestial' && (
        <MidnightSideBackdrop
          theme={theme}
          monogram={monogram}
          groomNickname={groomNickname}
          brideNickname={brideNickname}
          formattedDate={formattedDate}
        />
      )}
      {theme.id === 'javanese_heritage' && (
        <HeritageSideBackdrop
          theme={theme}
          monogram={monogram}
          groomNickname={groomNickname}
          brideNickname={brideNickname}
          formattedDate={formattedDate}
        />
      )}
      {theme.id === 'romantic_rose' && (
        <RomanticRoseSideBackdrop
          theme={theme}
          monogram={monogram}
          groomNickname={groomNickname}
          brideNickname={brideNickname}
          formattedDate={formattedDate}
        />
      )}
      {theme.id === 'emerald_garden' && (
        <EmeraldSideBackdrop
          theme={theme}
          monogram={monogram}
          groomNickname={groomNickname}
          brideNickname={brideNickname}
          formattedDate={formattedDate}
        />
      )}
      {(theme.id === 'champagne_gold' ||
        ![
          'midnight_celestial',
          'javanese_heritage',
          'romantic_rose',
          'emerald_garden',
        ].includes(theme.id)) && (
        <ChampagneSideBackdrop
          theme={theme}
          monogram={monogram}
          groomNickname={groomNickname}
          brideNickname={brideNickname}
          formattedDate={formattedDate}
        />
      )}
    </div>
  );
}

interface SubBackdropProps {
  theme: WeddingThemeConfig;
  monogram: string;
  groomNickname: string;
  brideNickname: string;
  formattedDate: string;
}

/* ===========================================================================
   1. CHAMPAGNE ROYALE — Satin Luxury Stage
   =========================================================================== */
function ChampagneSideBackdrop({
  theme,
  monogram,
  groomNickname,
  brideNickname,
  formattedDate,
}: SubBackdropProps) {
  return (
    <>
      {/* Full-bleed warm satin & damask pattern */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(212,175,55,0.14) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(197,164,109,0.16) 0%, transparent 45%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 14px 20px at 50% 50%, #C5A46D 0%, transparent 70%),
            repeating-linear-gradient(135deg, transparent, transparent 26px, rgba(197,164,109,0.18) 26px, rgba(197,164,109,0.18) 27px)
          `,
          backgroundSize: '64px 64px, 100% 100%',
        }}
      />

      {/* Outer gold border lines */}
      <div className="hidden md:block absolute inset-4 border border-[#C5A46D]/25 rounded-3xl" />
      <div
        className="hidden md:block absolute inset-6 border border-[#C5A46D]/15 rounded-2xl"
        style={{ borderStyle: 'dashed' }}
      />

      {/* Top-left & Top-right large luxury floral corners */}
      <svg
        className="hidden md:block absolute top-3 left-3 w-52 h-52 text-[#C5A46D] opacity-25 animate-float-gentle"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M12 180 V 36 C 12 20, 20 12, 36 12 H 180" stroke="currentColor" strokeWidth="2" />
        <path d="M22 160 V 42 C 22 28, 28 22, 42 22 H 160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M28 28 C 60 32, 85 55, 95 95 C 55 85, 32 60, 28 28 Z" fill="currentColor" fillOpacity="0.25" />
        <circle cx="52" cy="52" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="52" cy="52" r="3" fill="currentColor" />
      </svg>

      <svg
        className="hidden md:block absolute top-3 right-3 w-52 h-52 text-[#C5A46D] opacity-25 scale-x-[-1] animate-float-gentle"
        style={{ animationDelay: '1.5s' }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M12 180 V 36 C 12 20, 20 12, 36 12 H 180" stroke="currentColor" strokeWidth="2" />
        <path d="M22 160 V 42 C 22 28, 28 22, 42 22 H 160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M28 28 C 60 32, 85 55, 95 95 C 55 85, 32 60, 28 28 Z" fill="currentColor" fillOpacity="0.25" />
        <circle cx="52" cy="52" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="52" cy="52" r="3" fill="currentColor" />
      </svg>

      {/* Left Side Panel Decoration (Desktop xl+) */}
      <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4rem)] max-w-[260px] flex-col items-center text-center space-y-5">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border border-dashed animate-spin-slow opacity-50"
            style={{ borderColor: theme.colors.accent, animationDuration: '40s' }}
          />
          <div
            className="w-28 h-28 rounded-full border flex items-center justify-center shadow-sm backdrop-blur-sm"
            style={{
              borderColor: `${theme.colors.accent}60`,
              backgroundColor: `${theme.colors.bgSection}80`,
            }}
          >
            <span className="font-serif italic text-3xl font-semibold" style={{ color: theme.colors.accentDark }}>
              {monogram}
            </span>
          </div>
        </div>
        <div className="space-y-1.5 px-3">
          <span className="text-[10px] uppercase tracking-[0.35em] font-semibold block" style={{ color: theme.colors.accent }}>
            Royal Wedding
          </span>
          <p className="font-serif text-lg" style={{ color: theme.colors.textTitle }}>
            {groomNickname} &amp; {brideNickname}
          </p>
          <div className="w-12 h-px mx-auto my-2" style={{ backgroundColor: `${theme.colors.accent}60` }} />
          {formattedDate && (
            <p className="text-[11px] tracking-widest uppercase" style={{ color: theme.colors.textMuted }}>
              {formattedDate}
            </p>
          )}
        </div>
      </div>

      {/* Right Side Panel Decoration (Desktop xl+) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4rem)] max-w-[260px] flex-col items-center text-center space-y-4">
        <div
          className="p-6 rounded-3xl border backdrop-blur-sm space-y-3 w-full"
          style={{
            borderColor: `${theme.colors.accent}40`,
            backgroundColor: `${theme.colors.bgSection}75`,
          }}
        >
          <svg className="w-10 h-10 mx-auto opacity-80" viewBox="0 0 60 40" fill="none">
            <path
              d="M14 28 L 10 12 L 22 20 L 30 6 L 38 20 L 50 12 L 46 28 Z"
              stroke={theme.colors.accent}
              strokeWidth="1.5"
              fill={theme.colors.accent}
              fillOpacity="0.18"
            />
            <line x1="12" y1="33" x2="48" y2="33" stroke={theme.colors.accent} strokeWidth="1.2" />
          </svg>
          <p className="font-serif italic text-sm leading-relaxed" style={{ color: theme.colors.textBody }}>
            &ldquo;Dua jiwa, satu ikatan suci yang abadi dalam kasih sayang dan keberkahan.&rdquo;
          </p>
          <span className="text-[10px] uppercase tracking-[0.25em] block pt-1" style={{ color: theme.colors.accentDark }}>
            Champagne Royale
          </span>
        </div>
      </div>
    </>
  );
}

/* ===========================================================================
   2. EMERALD BOTANICAL — Enchanted Garden Stage
   =========================================================================== */
function EmeraldSideBackdrop({
  theme,
  monogram,
  groomNickname,
  brideNickname,
  formattedDate,
}: SubBackdropProps) {
  return (
    <>
      {/* Full-bleed botanical radial sunlight & leaf mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 15%, rgba(168,213,160,0.28) 0%, transparent 45%), radial-gradient(circle at 88% 85%, rgba(33,75,59,0.12) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 10px 18px at 50% 50%, #214B3B 0%, transparent 70%),
            linear-gradient(60deg, transparent 48%, rgba(33,75,59,0.2) 50%, transparent 52%)
          `,
          backgroundSize: '48px 48px, 32px 32px',
        }}
      />

      {/* Outer botanical frame */}
      <div className="hidden md:block absolute inset-4 border border-[#214B3B]/15 rounded-3xl" />

      {/* Large Left & Right Hanging Eucalyptus / Botanical Branches */}
      <svg
        className="hidden md:block absolute top-0 left-0 w-72 h-80 text-[#214B3B] opacity-25 animate-leaf-sway"
        style={{ transformOrigin: 'top left' }}
        viewBox="0 0 240 260"
        fill="currentColor"
      >
        <path d="M0 0 C 30 50, 75 110, 95 200" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M20 35 C 45 20, 65 30, 52 48 C 38 54, 18 45, 20 35 Z" opacity="0.6" />
        <path d="M45 75 C 72 60, 92 72, 78 90 C 62 96, 42 86, 45 75 Z" opacity="0.55" />
        <path d="M68 120 C 96 105, 114 118, 100 136 C 84 142, 65 130, 68 120 Z" opacity="0.5" />
        <path d="M82 162 C 108 148, 125 160, 112 178 C 96 184, 78 172, 82 162 Z" opacity="0.4" />
        <path d="M12 70 C -4 88, 6 108, 24 98 C 30 85, 22 66, 12 70 Z" opacity="0.45" />
        <path d="M35 115 C 16 132, 26 154, 46 144 C 52 130, 44 110, 35 115 Z" opacity="0.4" />
      </svg>

      <svg
        className="hidden md:block absolute top-0 right-0 w-72 h-80 text-[#214B3B] opacity-25 scale-x-[-1] animate-leaf-sway"
        style={{ transformOrigin: 'top right', animationDelay: '1.2s' }}
        viewBox="0 0 240 260"
        fill="currentColor"
      >
        <path d="M0 0 C 30 50, 75 110, 95 200" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M20 35 C 45 20, 65 30, 52 48 C 38 54, 18 45, 20 35 Z" opacity="0.6" />
        <path d="M45 75 C 72 60, 92 72, 78 90 C 62 96, 42 86, 45 75 Z" opacity="0.55" />
        <path d="M68 120 C 96 105, 114 118, 100 136 C 84 142, 65 130, 68 120 Z" opacity="0.5" />
        <path d="M82 162 C 108 148, 125 160, 112 178 C 96 184, 78 172, 82 162 Z" opacity="0.4" />
      </svg>

      {/* Bottom Corner Foliage */}
      <svg
        className="hidden md:block absolute bottom-0 left-0 w-64 h-64 text-[#315C48] opacity-20 scale-y-[-1]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M0 0 C 40 40, 80 90, 110 160" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M30 40 C 55 28, 72 38, 60 55 C 46 60, 26 50, 30 40 Z" opacity="0.6" />
        <path d="M60 85 C 85 72, 102 82, 90 100 C 76 105, 56 95, 60 85 Z" opacity="0.5" />
      </svg>
      <svg
        className="hidden md:block absolute bottom-0 right-0 w-64 h-64 text-[#315C48] opacity-20 scale-[-1]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M0 0 C 40 40, 80 90, 110 160" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M30 40 C 55 28, 72 38, 60 55 C 46 60, 26 50, 30 40 Z" opacity="0.6" />
        <path d="M60 85 C 85 72, 102 82, 90 100 C 76 105, 56 95, 60 85 Z" opacity="0.5" />
      </svg>

      {/* Left Side Panel (Desktop xl+) */}
      <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4rem)] max-w-[260px] flex-col items-center text-center space-y-4">
        <div
          className="w-28 h-28 rounded-full border-2 flex items-center justify-center backdrop-blur-sm shadow-sm"
          style={{
            borderColor: '#B9A477',
            backgroundColor: 'rgba(250,248,241,0.75)',
          }}
        >
          <span className="font-serif italic text-3xl font-semibold text-[#214B3B]">{monogram}</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B9A477] block">
            Garden Celebration
          </span>
          <p className="font-serif text-lg text-[#214B3B]">
            {groomNickname} &amp; {brideNickname}
          </p>
          {formattedDate && (
            <p className="text-[11px] uppercase tracking-widest text-[#315C48]/80">{formattedDate}</p>
          )}
        </div>
      </div>

      {/* Right Side Panel (Desktop xl+) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4rem)] max-w-[260px] flex-col items-center text-center">
        <div
          className="p-6 rounded-3xl border backdrop-blur-sm space-y-3"
          style={{
            borderColor: '#C8D8C6',
            backgroundColor: 'rgba(250,248,241,0.75)',
          }}
        >
          <svg className="w-8 h-8 mx-auto text-[#214B3B] opacity-75" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5 19 5 19C5 19 14 16 16 7C17 2 17 2 17 8Z" />
          </svg>
          <p className="font-serif italic text-sm text-[#315C48] leading-relaxed">
            &ldquo;Bertumbuh bersama dalam harmoni, keteduhan, dan kasih yang terus bersemi.&rdquo;
          </p>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B9A477] block">
            Emerald Botanical
          </span>
        </div>
      </div>
    </>
  );
}

/* ===========================================================================
   3. ROMANTIC ROSE & BLUSH — Floral & Bokeh Stage
   =========================================================================== */
function RomanticRoseSideBackdrop({
  theme,
  monogram,
  groomNickname,
  brideNickname,
  formattedDate,
}: SubBackdropProps) {
  return (
    <>
      {/* Full-bleed soft blush watercolor wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 20%, rgba(231,182,193,0.42) 0%, transparent 45%), radial-gradient(circle at 88% 25%, rgba(244,221,226,0.5) 0%, transparent 45%), radial-gradient(circle at 20% 85%, rgba(201,154,145,0.22) 0%, transparent 45%), radial-gradient(circle at 85% 82%, rgba(231,182,193,0.35) 0%, transparent 45%)',
        }}
      />

      {/* Delicate lace dots */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            radial-gradient(#C77B8C 1.8px, transparent 1.8px),
            radial-gradient(#C99A91 1.2px, transparent 1.2px)
          `,
          backgroundSize: '38px 38px, 19px 19px',
          backgroundPosition: '0 0, 9px 9px',
        }}
      />

      {/* Outer rose-gold frame */}
      <div className="hidden md:block absolute inset-4 border border-[#C77B8C]/20 rounded-3xl" />
      <div
        className="hidden md:block absolute inset-6 border border-[#C99A91]/15 rounded-2xl"
        style={{ borderStyle: 'dashed' }}
      />

      {/* Large Rose Bouquet Corners (Top Left & Top Right) */}
      <svg
        className="hidden md:block absolute top-0 left-0 w-64 h-64 text-[#C77B8C] opacity-25 animate-float-gentle"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <circle cx="42" cy="42" r="28" opacity="0.45" />
        <circle cx="78" cy="30" r="18" opacity="0.35" />
        <circle cx="28" cy="80" r="20" opacity="0.35" />
        <circle cx="65" cy="68" r="14" opacity="0.28" />
        <path d="M55 65 C 85 95, 115 130, 155 170" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.45" />
        <path d="M88 92 C 106 82, 118 90, 102 106 C 90 110, 82 100, 88 92 Z" opacity="0.35" />
      </svg>

      <svg
        className="hidden md:block absolute top-0 right-0 w-64 h-64 text-[#C77B8C] opacity-25 scale-x-[-1] animate-float-gentle"
        style={{ animationDelay: '1.4s' }}
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <circle cx="42" cy="42" r="28" opacity="0.45" />
        <circle cx="78" cy="30" r="18" opacity="0.35" />
        <circle cx="28" cy="80" r="20" opacity="0.35" />
        <circle cx="65" cy="68" r="14" opacity="0.28" />
        <path d="M55 65 C 85 95, 115 130, 155 170" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.45" />
      </svg>

      {/* Bottom Rose Corners */}
      <svg
        className="hidden md:block absolute bottom-0 left-0 w-56 h-56 text-[#C99A91] opacity-25 scale-y-[-1]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <circle cx="40" cy="40" r="24" opacity="0.4" />
        <circle cx="72" cy="32" r="16" opacity="0.3" />
        <circle cx="28" cy="74" r="16" opacity="0.3" />
      </svg>
      <svg
        className="hidden md:block absolute bottom-0 right-0 w-56 h-56 text-[#C99A91] opacity-25 scale-[-1]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <circle cx="40" cy="40" r="24" opacity="0.4" />
        <circle cx="72" cy="32" r="16" opacity="0.3" />
        <circle cx="28" cy="74" r="16" opacity="0.3" />
      </svg>

      {/* Ambient Bokeh Circles on sides */}
      {[
        { top: '28%', left: '8%', size: 42 },
        { top: '68%', left: '14%', size: 28 },
        { top: '24%', right: '10%', size: 36 },
        { top: '72%', right: '12%', size: 48 },
      ].map((b, idx) => (
        <div
          key={idx}
          className="hidden md:block absolute rounded-full animate-bokeh"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: 'radial-gradient(circle, rgba(199,123,140,0.28) 0%, transparent 70%)',
            animationDelay: `${idx * 1.4}s`,
          }}
        />
      ))}

      {/* Left Side Panel (Desktop xl+) */}
      <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4rem)] max-w-[260px] flex-col items-center text-center space-y-4">
        <div
          className="w-28 h-28 rounded-full border flex items-center justify-center backdrop-blur-sm shadow-sm relative"
          style={{
            borderColor: '#C77B8C80',
            backgroundColor: 'rgba(255,255,255,0.65)',
          }}
        >
          <span className="font-serif italic text-3xl text-[#9D596A]">{monogram}</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C77B8C] block">
            Love &amp; Devotion
          </span>
          <p className="font-serif italic text-xl text-[#5A2635]">
            {groomNickname} &amp; {brideNickname}
          </p>
          {formattedDate && (
            <p className="text-[11px] uppercase tracking-widest text-[#9D596A]/80">{formattedDate}</p>
          )}
        </div>
      </div>

      {/* Right Side Panel (Desktop xl+) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4rem)] max-w-[260px] flex-col items-center text-center">
        <div
          className="p-6 rounded-3xl border backdrop-blur-sm space-y-3"
          style={{
            borderColor: '#F4DDE2',
            backgroundColor: 'rgba(255,255,255,0.65)',
          }}
        >
          <svg className="w-6 h-6 mx-auto text-[#C77B8C] animate-heart-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <p className="font-serif italic text-sm text-[#7D4253] leading-relaxed">
            &ldquo;Cinta adalah bahasa terindah yang mempertemukan dua hati dalam satu janji.&rdquo;
          </p>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C77B8C] block">
            Romantic Rose
          </span>
        </div>
      </div>
    </>
  );
}

/* ===========================================================================
   4. ROYAL HERITAGE NUSANTARA — Keraton & Batik Prada Stage
   =========================================================================== */
function HeritageSideBackdrop({
  theme,
  monogram,
  groomNickname,
  brideNickname,
  formattedDate,
}: SubBackdropProps) {
  return (
    <>
      {/* Full-bleed Batik Parang & Kawung Texture */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 16px, rgba(194,154,66,0.22) 16px, rgba(194,154,66,0.22) 18px),
            repeating-linear-gradient(-45deg, transparent, transparent 16px, rgba(108,38,48,0.12) 16px, rgba(108,38,48,0.12) 18px)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(circle 7px at 50% 50%, #C29A42 0%, transparent 100%),
            radial-gradient(circle 4px at 25% 25%, rgba(99,59,38,0.45) 0%, transparent 100%),
            radial-gradient(circle 4px at 75% 75%, rgba(99,59,38,0.45) 0%, transparent 100%)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Warm keraton ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 30%, rgba(194,154,66,0.18) 0%, transparent 45%), radial-gradient(circle at 88% 70%, rgba(108,38,48,0.12) 0%, transparent 45%)',
        }}
      />

      {/* Outer Keraton Double Frame */}
      <div className="hidden md:block absolute inset-4 border-2 border-[#C29A42]/25 rounded-sm" />
      <div
        className="hidden md:block absolute inset-6 border border-[#6C2630]/20 rounded-sm"
        style={{ borderStyle: 'dashed' }}
      />

      {/* Side Keraton Pillars on far left & right */}
      <div className="hidden md:flex absolute top-0 bottom-0 left-2 w-10 flex-col justify-around opacity-30 text-[#C29A42]">
        {[...Array(6)].map((_, i) => (
          <svg key={i} className="w-10 h-28" viewBox="0 0 40 120" fill="currentColor">
            <path d="M0 0 H 16 Q 34 30 16 60 Q 34 90 16 120 H 0 Z" opacity="0.35" />
            <circle cx="18" cy="30" r="3" />
            <circle cx="18" cy="90" r="3" />
          </svg>
        ))}
      </div>
      <div className="hidden md:flex absolute top-0 bottom-0 right-2 w-10 flex-col justify-around opacity-30 text-[#C29A42] scale-x-[-1]">
        {[...Array(6)].map((_, i) => (
          <svg key={i} className="w-10 h-28" viewBox="0 0 40 120" fill="currentColor">
            <path d="M0 0 H 16 Q 34 30 16 60 Q 34 90 16 120 H 0 Z" opacity="0.35" />
            <circle cx="18" cy="30" r="3" />
            <circle cx="18" cy="90" r="3" />
          </svg>
        ))}
      </div>

      {/* Left Side Panel with Gunungan Wayang (Desktop xl+) */}
      <div className="hidden xl:flex fixed left-10 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4.5rem)] max-w-[260px] flex-col items-center text-center space-y-4">
        <svg className="w-28 h-40 text-[#C29A42] opacity-80 animate-float-gentle drop-shadow-sm" viewBox="0 0 100 140" fill="none">
          <path
            d="M50 5 C 28 38, 6 82, 6 122 C 22 134, 78 134, 94 122 C 94 82, 72 38, 50 5 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <path d="M50 125 V 28" stroke="currentColor" strokeWidth="1.8" />
          <path d="M50 55 Q 32 48, 22 65 Q 35 62, 50 68" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.2" />
          <path d="M50 55 Q 68 48, 78 65 Q 65 62, 50 68" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.2" />
          <path d="M50 84 Q 26 76, 16 96 Q 32 92, 50 98" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.2" />
          <path d="M50 84 Q 74 76, 84 96 Q 68 92, 50 98" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="50" cy="18" r="3.5" fill="currentColor" />
        </svg>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-[#6C2630] block">
            Kidung Penganten
          </span>
          <p className="font-serif text-lg font-bold text-[#4A2418]">
            {groomNickname} &amp; {brideNickname}
          </p>
          {formattedDate && (
            <p className="text-[11px] uppercase tracking-widest text-[#86512F]">{formattedDate}</p>
          )}
        </div>
      </div>

      {/* Right Side Panel (Desktop xl+) */}
      <div className="hidden xl:flex fixed right-10 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4.5rem)] max-w-[260px] flex-col items-center text-center">
        <div
          className="p-6 rounded-2xl border-2 backdrop-blur-sm space-y-3"
          style={{
            borderColor: '#C29A4260',
            backgroundColor: 'rgba(247,240,227,0.8)',
          }}
        >
          <div className="w-14 h-14 mx-auto rounded-full border border-[#C29A42] flex items-center justify-center bg-[#6C2630]/10">
            <span className="font-serif italic text-xl font-bold text-[#6C2630]">{monogram}</span>
          </div>
          <p className="font-serif italic text-sm text-[#633B26] leading-relaxed">
            &ldquo;Mugi dados kulawarga ingkang sakinah, mawaddah, warahmah saha pinaringan berkah.&rdquo;
          </p>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C29A42] block">
            Royal Heritage Nusantara
          </span>
        </div>
      </div>
    </>
  );
}

/* ===========================================================================
   5. MIDNIGHT CELESTIAL GLAM — Starry Night & Nebula Stage
   =========================================================================== */
function MidnightSideBackdrop({
  theme,
  monogram,
  groomNickname,
  brideNickname,
  formattedDate,
}: SubBackdropProps) {
  return (
    <>
      {/* Full-bleed deep space gradient & nebulae */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 15% 25%, rgba(88,28,135,0.3) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(212,175,55,0.16) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(30,64,175,0.28) 0%, transparent 45%)',
        }}
      />

      {/* Metallic gold outer frame */}
      <div className="hidden md:block absolute inset-4 border border-[#D4AF37]/20 rounded-3xl" />

      {/* Glowing Moon on Top-Right */}
      <div className="hidden md:block absolute top-12 right-12 animate-moon-glow">
        <div
          className="w-20 h-20 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, #F4F2EE 0%, #E6D6AD 45%, rgba(212,175,55,0.25) 75%, transparent 100%)',
            boxShadow: '0 0 45px rgba(212,175,55,0.35)',
          }}
        />
      </div>

      {/* Left Constellation SVG */}
      <svg className="hidden md:block absolute top-14 left-12 w-56 h-56 opacity-45" viewBox="0 0 200 200" fill="none">
        <circle cx="30" cy="40" r="2.5" fill="#D4AF37" className="animate-star-twinkle" />
        <circle cx="85" cy="25" r="3" fill="#E6D6AD" className="animate-star-twinkle" style={{ animationDelay: '0.6s' }} />
        <circle cx="130" cy="70" r="2" fill="#D4AF37" className="animate-star-twinkle" style={{ animationDelay: '1.2s' }} />
        <circle cx="95" cy="125" r="2.5" fill="#F4F2EE" className="animate-star-twinkle" style={{ animationDelay: '1.8s' }} />
        <circle cx="155" cy="150" r="3" fill="#D4AF37" className="animate-star-twinkle" style={{ animationDelay: '2.2s' }} />
        <line x1="30" y1="40" x2="85" y2="25" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.45" />
        <line x1="85" y1="25" x2="130" y2="70" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.45" />
        <line x1="130" y1="70" x2="95" y2="125" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.35" />
        <line x1="95" y1="125" x2="155" y2="150" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.35" />
      </svg>

      {/* Shooting Stars on sides */}
      <div className="hidden md:block absolute top-[22%] left-[8%] w-[140px] h-[1.5px] bg-gradient-to-r from-transparent via-amber-200 to-transparent -rotate-45 opacity-0 animate-shooting-star" />
      <div className="hidden md:block absolute top-[62%] right-[8%] w-[160px] h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent -rotate-45 opacity-0 animate-shooting-star-delayed" />

      {/* Left Side Panel (Desktop xl+) */}
      <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4rem)] max-w-[260px] flex-col items-center text-center space-y-4">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/50 animate-spin-slow"
            style={{ animationDuration: '45s' }}
          />
          <div className="w-24 h-24 rounded-full border border-[#D4AF37]/60 bg-[#1C3260]/60 backdrop-blur-sm flex items-center justify-center">
            <span className="font-serif italic text-2xl text-[#D4AF37]">{monogram}</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#D4AF37] block">
            Written in the Stars
          </span>
          <p className="font-serif text-lg text-[#F4F2EE]">
            {groomNickname} &amp; {brideNickname}
          </p>
          {formattedDate && (
            <p className="text-[11px] uppercase tracking-widest text-[#E6D6AD]/80">{formattedDate}</p>
          )}
        </div>
      </div>

      {/* Right Side Panel (Desktop xl+) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 w-[calc((100vw-42rem)/2-4rem)] max-w-[260px] flex-col items-center text-center">
        <div className="p-6 rounded-3xl border border-[#D4AF37]/30 bg-[#1C3260]/50 backdrop-blur-sm space-y-3">
          <svg className="w-8 h-8 mx-auto text-[#D4AF37] animate-pulse-glow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.2 8.5L21 9L15.8 13.5L17.5 20.2L12 16.5L6.5 20.2L8.2 13.5L3 9L9.8 8.5L12 2Z" />
          </svg>
          <p className="font-serif italic text-sm text-[#E6D6AD] leading-relaxed">
            &ldquo;Di bawah langit malam bertabur bintang, dua hati berjanji untuk selamanya.&rdquo;
          </p>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block">
            Midnight Celestial
          </span>
        </div>
      </div>
    </>
  );
}

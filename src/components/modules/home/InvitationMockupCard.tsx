import * as React from 'react';
import { WeddingThemeConfig } from '@/lib/constants/themes';
import { CornerFlourish, FlourishDivider, ThemeHeaderMotif } from '@/components/modules/invitation/ThemeOrnaments';

interface InvitationMockupCardProps {
  theme: WeddingThemeConfig;
  compact?: boolean;
  className?: string;
}

/**
 * Reusable realistic digital invitation card mockup using actual theme colors & ornaments
 */
export function InvitationMockupCard({ theme, compact = false, className = '' }: InvitationMockupCardProps) {
  return (
    <div
      className={`relative rounded-[28px] border overflow-hidden select-none transition-all duration-500 ${className}`}
      style={{
        backgroundColor: theme.colors.bgPage,
        borderColor: `${theme.colors.borderAccent}60`,
      }}
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-40 rounded-full blur-2xl opacity-45 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${theme.colors.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Inner Decorative Border */}
      <div
        className="absolute inset-2.5 rounded-[20px] border pointer-events-none opacity-45"
        style={{ borderColor: theme.colors.borderAccent, borderStyle: 'dashed' }}
      />

      {/* Corner Ornaments */}
      <CornerFlourish
        themeId={theme.id}
        color={theme.colors.accent}
        position="tl"
        className="absolute top-1.5 left-1.5 scale-75 origin-top-left opacity-80"
      />
      <CornerFlourish
        themeId={theme.id}
        color={theme.colors.accent}
        position="tr"
        className="absolute top-1.5 right-1.5 scale-75 origin-top-right opacity-80"
      />
      {!compact && (
        <>
          <CornerFlourish
            themeId={theme.id}
            color={theme.colors.accent}
            position="bl"
            className="absolute bottom-1.5 left-1.5 scale-75 origin-bottom-left opacity-60"
          />
          <CornerFlourish
            themeId={theme.id}
            color={theme.colors.accent}
            position="br"
            className="absolute bottom-1.5 right-1.5 scale-75 origin-bottom-right opacity-60"
          />
        </>
      )}

      {/* Card Body */}
      <div className={`relative z-10 flex flex-col items-center text-center ${compact ? 'px-5 py-7' : 'px-6 py-10'}`}>
        <div className="scale-75 -my-2">
          <ThemeHeaderMotif themeId={theme.id} color={theme.colors.accent} />
        </div>

        <span
          className="text-[9px] uppercase tracking-[0.28em] font-semibold mt-1"
          style={{ color: theme.colors.accentDark }}
        >
          The Wedding Of
        </span>

        <h4
          className={`font-serif ${compact ? 'text-2xl' : 'text-3xl'} font-normal mt-1.5`}
          style={{ color: theme.colors.textTitle }}
        >
          Fadhil <span className="italic" style={{ color: theme.colors.accent }}>&amp;</span> Mazaya
        </h4>

        <div className="w-full max-w-[180px] -my-2 scale-75">
          <FlourishDivider themeId={theme.id} color={theme.colors.dividerColor} />
        </div>

        <p
          className="text-[10px] uppercase tracking-[0.2em] font-medium"
          style={{ color: theme.colors.textMuted }}
        >
          Sabtu, 8 Januari 2027
        </p>

        {!compact && (
          <>
            {/* Mini Countdown */}
            <div className="grid grid-cols-4 gap-1.5 w-full max-w-[210px] mt-4">
              {[
                { v: '43', l: 'Hari' },
                { v: '12', l: 'Jam' },
                { v: '30', l: 'Mnt' },
                { v: '18', l: 'Dtk' },
              ].map((c) => (
                <div
                  key={c.l}
                  className="rounded-xl border py-1.5 px-1"
                  style={{
                    backgroundColor: theme.colors.bgSection,
                    borderColor: `${theme.colors.borderAccent}50`,
                  }}
                >
                  <span className="font-serif text-xs font-bold block" style={{ color: theme.colors.accentDark }}>
                    {c.v}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider block" style={{ color: theme.colors.textMuted }}>
                    {c.l}
                  </span>
                </div>
              ))}
            </div>

            {/* Mock Open Button */}
            <div
              className="mt-5 px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-sm"
              style={{
                backgroundColor: theme.colors.buttonBg,
                color: theme.colors.buttonText,
              }}
            >
              Buka Undangan
            </div>
          </>
        )}
      </div>
    </div>
  );
}

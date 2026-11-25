import * as React from 'react';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center text-[#302D29]">
      <div className="space-y-6 flex flex-col items-center animate-in fade-in duration-300">
        {/* Monogram with animated golden halo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full border-2 border-[#B69A72]/20 animate-ping opacity-50" />
          <div className="w-16 h-16 rounded-full bg-white border border-[#B69A72]/40 text-[#846B48] flex items-center justify-center shadow-luxury">
            <span className="font-serif italic text-2xl font-bold tracking-tight">M</span>
          </div>
        </div>

        {/* Brand & Loading Label */}
        <div className="space-y-1.5">
          <span className="font-serif text-lg font-bold tracking-widest text-[#302D29] block">
            MAZÉLIA
          </span>
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#846B48] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B69A72] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B69A72] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B69A72] animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="ml-1 tracking-wider uppercase text-[10px]">Memuat Halaman</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import * as React from 'react';

export default function InvitationLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center text-[#302D29] font-sans selection:bg-[#B69A72]/20">
      <div className="max-w-sm w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#EAE5DC] shadow-luxury space-y-6 flex flex-col items-center animate-in fade-in duration-500">
        {/* Monogram Seal */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full border border-[#B69A72]/30 animate-ping opacity-40" />
          <div className="w-16 h-16 rounded-full bg-[#FAF8F4] border-2 border-[#B69A72]/50 text-[#846B48] flex items-center justify-center shadow-sm">
            <span className="font-serif italic text-2xl font-bold">M</span>
          </div>
        </div>

        {/* Title & Couple Placeholder */}
        <div className="space-y-2 w-full flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-[#846B48] font-semibold block">
            The Wedding of
          </span>
          <div className="h-7 w-44 bg-[#FAF8F4] rounded-lg animate-pulse" />
          <div className="h-4 w-32 bg-[#FAF8F4] rounded animate-pulse pt-1" />
        </div>

        {/* Shimmering Line */}
        <div className="w-16 h-0.5 bg-[#B69A72]/30 rounded-full my-2" />

        {/* Loading Indicator */}
        <div className="space-y-1.5 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-xs text-[#846B48] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B69A72] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B69A72] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B69A72] animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="ml-1 tracking-wider uppercase text-[10px]">Mempersiapkan Undangan</span>
          </div>
          <p className="text-[10px] text-[#9B9185]">
            MAZÉLIA — Digital Wedding Invitation
          </p>
        </div>
      </div>
    </div>
  );
}
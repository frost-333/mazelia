import * as React from 'react';

export default function MonitorLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302D29] font-sans">
      {/* Top Navbar Skeleton */}
      <header className="bg-white/90 border-b border-[#EAE5DC] h-16 flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF8F4] animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 w-20 bg-[#FAF8F4] rounded animate-pulse" />
              <div className="h-3 w-16 bg-[#FAF8F4] rounded animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-28 bg-[#FAF8F4] rounded-xl animate-pulse" />
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
        {/* Banner Skeleton */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm space-y-3">
          <div className="h-4 w-32 bg-[#FAF8F4] rounded-full animate-pulse" />
          <div className="h-8 w-64 bg-[#FAF8F4] rounded-xl animate-pulse" />
          <div className="h-4 w-48 bg-[#FAF8F4] rounded animate-pulse" />
        </div>

        {/* 4 Metrics Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 bg-[#FAF8F4] rounded animate-pulse" />
                <div className="h-8 w-8 rounded-lg bg-[#FAF8F4] animate-pulse" />
              </div>
              <div className="h-8 w-12 bg-[#FAF8F4] rounded-lg animate-pulse" />
              <div className="h-3 w-20 bg-[#FAF8F4] rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Quick WhatsApp Sender Skeleton */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-sm space-y-4">
          <div className="h-5 w-56 bg-[#FAF8F4] rounded animate-pulse" />
          <div className="h-10 bg-[#FAF8F4] rounded-xl animate-pulse" />
        </div>

        {/* Wishes List Skeleton */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-sm space-y-4">
          <div className="h-6 w-48 bg-[#FAF8F4] rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#FAF8F4] space-y-2">
                <div className="h-4 w-28 bg-white rounded animate-pulse" />
                <div className="h-12 bg-white rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
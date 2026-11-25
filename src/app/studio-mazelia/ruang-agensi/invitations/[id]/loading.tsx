import * as React from 'react';

export default function ClientDetailLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302D29] font-sans">
      {/* Top Navbar Skeleton */}
      <header className="bg-white border-b border-[#EAE5DC] h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-24 bg-[#FAF8F4] rounded animate-pulse" />
            <div className="h-6 w-48 bg-[#FAF8F4] rounded-lg animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 bg-[#FAF8F4] rounded-xl animate-pulse" />
            <div className="h-9 w-24 bg-[#FAF8F4] rounded-xl animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
        {/* Banner Skeleton */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-24 bg-[#FAF8F4] rounded-full animate-pulse" />
              <div className="h-5 w-32 bg-[#FAF8F4] rounded-lg animate-pulse" />
            </div>
            <div className="h-9 w-80 bg-[#FAF8F4] rounded-xl animate-pulse" />
            <div className="h-4 w-64 bg-[#FAF8F4] rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-36 bg-[#FAF8F4] rounded-xl animate-pulse" />
            <div className="h-10 w-32 bg-[#FAF8F4] rounded-xl animate-pulse" />
          </div>
        </div>

        {/* 4 Metric Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 bg-[#FAF8F4] rounded animate-pulse" />
                <div className="h-8 w-8 rounded-lg bg-[#FAF8F4] animate-pulse" />
              </div>
              <div className="h-8 w-16 bg-[#FAF8F4] rounded-lg animate-pulse" />
              <div className="h-3 w-28 bg-[#FAF8F4] rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Guest Link Generator Card Skeleton */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm space-y-4">
          <div className="h-6 w-72 bg-[#FAF8F4] rounded-lg animate-pulse" />
          <div className="h-4 w-96 bg-[#FAF8F4] rounded animate-pulse" />
          <div className="h-28 bg-[#FAF8F4] rounded-xl animate-pulse" />
        </div>

        {/* Guestbook Table Skeleton */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] shadow-sm overflow-hidden p-6 space-y-4">
          <div className="h-7 w-64 bg-[#FAF8F4] rounded-lg animate-pulse" />
          <div className="h-10 w-full bg-[#FAF8F4] rounded-xl animate-pulse" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-[#FAF8F4] rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
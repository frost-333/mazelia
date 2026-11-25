import * as React from 'react';

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302D29] font-sans">
      {/* Top Navbar Skeleton */}
      <header className="bg-white border-b border-[#EAE5DC] h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-28 bg-[#FAF8F4] rounded-lg animate-pulse" />
            <div className="h-4 w-14 bg-[#FAF8F4] rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-32 bg-[#FAF8F4] rounded-xl animate-pulse" />
            <div className="h-9 w-9 bg-[#FAF8F4] rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
        {/* Banner Skeleton */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2.5">
            <div className="h-5 w-40 bg-[#FAF8F4] rounded-full animate-pulse" />
            <div className="h-8 w-72 bg-[#FAF8F4] rounded-xl animate-pulse" />
            <div className="h-4 w-96 bg-[#FAF8F4] rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-44 bg-[#FAF8F4] rounded-xl animate-pulse shrink-0" />
        </div>

        {/* Global Metric Cards Skeleton */}
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

        {/* Search & Grid Skeleton */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="h-10 w-full sm:w-80 bg-white rounded-xl border border-[#EAE5DC] animate-pulse" />
            <div className="h-10 w-48 bg-white rounded-xl border border-[#EAE5DC] animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-20 bg-[#FAF8F4] rounded-full animate-pulse" />
                  <div className="h-5 w-5 bg-[#FAF8F4] rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-[#FAF8F4] rounded animate-pulse" />
                  <div className="h-4 w-28 bg-[#FAF8F4] rounded animate-pulse" />
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="h-3.5 w-40 bg-[#FAF8F4] rounded animate-pulse" />
                  <div className="h-3.5 w-48 bg-[#FAF8F4] rounded animate-pulse" />
                </div>
                <div className="pt-4 border-t border-[#EAE5DC] space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-12 bg-[#FAF8F4] rounded-xl animate-pulse" />
                    <div className="h-12 bg-[#FAF8F4] rounded-xl animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-9 bg-[#FAF8F4] rounded-xl animate-pulse" />
                    <div className="h-9 bg-[#FAF8F4] rounded-xl animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
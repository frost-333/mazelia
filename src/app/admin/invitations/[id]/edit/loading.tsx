import * as React from 'react';

export default function EditInvitationLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header Skeleton */}
      <div className="space-y-2 pb-4 border-b border-[#EAE5DC]">
        <div className="h-4 w-36 bg-gray-200/60 rounded animate-pulse" />
        <div className="h-8 w-72 bg-gray-200/60 rounded-xl animate-pulse" />
        <div className="h-4 w-96 bg-gray-200/60 rounded animate-pulse" />
      </div>

      {/* Sections Skeleton */}
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-4">
            <div className="h-6 w-48 bg-[#FAF8F4] rounded-lg animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="h-10 bg-[#FAF8F4] rounded-xl animate-pulse" />
              <div className="h-10 bg-[#FAF8F4] rounded-xl animate-pulse" />
            </div>
            <div className="h-10 bg-[#FAF8F4] rounded-xl animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
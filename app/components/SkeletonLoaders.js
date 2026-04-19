'use client';

export function SkeletonPriceCard() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-pulse">
      <div className="h-4 bg-gray-400/30 rounded w-20 mb-2"></div>
      <div className="h-10 bg-gray-400/30 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-400/30 rounded w-24"></div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr className="border-t border-white/10 animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-400/30 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-400/30 rounded w-32"></div>
      </td>
    </tr>
  );
}

export function SkeletonAssetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20 animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="h-10 bg-gray-400/30 rounded w-48 mb-2"></div>
              <div className="h-6 bg-gray-400/30 rounded w-32"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-400/30 rounded w-full"></div>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SkeletonPriceCard />
          <SkeletonPriceCard />
          <SkeletonPriceCard />
        </div>

        {/* Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 mb-8">
          <table className="w-full animate-pulse">
            <tbody>
              <SkeletonTableRow />
              <SkeletonTableRow />
              <SkeletonTableRow />
              <SkeletonTableRow />
            </tbody>
          </table>
        </div>

        {/* Description */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 animate-pulse">
          <div className="h-8 bg-gray-400/30 rounded w-40 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-400/30 rounded w-full"></div>
            <div className="h-4 bg-gray-400/30 rounded w-full"></div>
            <div className="h-4 bg-gray-400/30 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="inline-block animate-spin">
      <svg
        className="w-8 h-8 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>
  );
}

'use client';

import Link from 'next/link';

/**
 * Dashboard Card Component
 * Minimalist tasarımlı dashboard kartı
 */
export function DashboardCard({ 
  icon, 
  title, 
  description, 
  status, 
  statusColor,
  value,
  change,
  isPositive,
  link,
  actionText = 'Detayları Gör'
}) {
  const content = (
    <div className={`block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer h-full ${
      link ? '' : 'cursor-default'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-4xl mb-2 inline-block">{icon}</span>
          <h3 className="text-xl font-bold text-black">{title}</h3>
        </div>
        {status && (
          <span className={`text-xs font-bold px-2 py-1 rounded ${statusColor}`}>
            {status}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Stats */}
      {value !== undefined && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600 mb-1">Mevcut Durum</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black">{value}</span>
            {change !== undefined && (
              <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      {link && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-xs font-semibold text-blue-600">{actionText}</span>
          <span className="text-gray-400">→</span>
        </div>
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}

export default DashboardCard;

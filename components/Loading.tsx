import React from 'react';

// Simple spinner component
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-seltronik-red ${sizeClasses[size]} ${className}`} />
  );
};

// Card skeleton for products/projects/certificates
export const CardSkeleton: React.FC<{ viewMode?: 'grid' | 'list' }> = ({ viewMode = 'grid' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse ${
      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
    }`}>
      {/* Image skeleton */}
      <div className={`bg-gray-300 dark:bg-gray-600 ${
        viewMode === 'grid' 
          ? 'h-40 sm:h-48 md:h-56' 
          : 'h-48 md:h-32 md:w-48 flex-shrink-0'
      }`} />
      
      {/* Content skeleton */}
      <div className={`p-4 md:p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
        {/* Title */}
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3 w-3/4" />
        
        {/* Description lines */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
        </div>
        
        {/* Tags/features */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16" />
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20" />
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-12" />
        </div>
        
        {/* Button */}
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full" />
      </div>
    </div>
  );
};

// Grid skeleton
export const GridSkeleton: React.FC<{ 
  count?: number; 
  viewMode?: 'grid' | 'list';
  gridCols?: string;
}> = ({ 
  count = 8, 
  viewMode = 'grid',
  gridCols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
}) => {
  return (
    <div className={
      viewMode === 'grid'
        ? `grid ${gridCols} gap-4 md:gap-6`
        : 'space-y-4 md:space-y-6'
    }>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} viewMode={viewMode} />
      ))}
    </div>
  );
};

// Loading state with message
export const LoadingState: React.FC<{ 
  message?: string;
  showSpinner?: boolean;
  className?: string;
}> = ({ 
  message = 'Memuat data...', 
  showSpinner = true,
  className = 'py-12'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {showSpinner && <Spinner size="lg" className="mb-4" />}
      <p className="text-gray-600 dark:text-gray-400 text-lg">{message}</p>
    </div>
  );
};

// Error state component
export const ErrorState: React.FC<{
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({ 
  message = 'Terjadi kesalahan saat memuat data', 
  onRetry,
  className = 'py-12'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-seltronik-red text-white px-6 py-2 rounded-lg hover:bg-seltronik-red-hover transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
};

// Empty state component
export const EmptyState: React.FC<{
  title?: string;
  message?: string;
  onReset?: () => void;
  resetLabel?: string;
  icon?: string;
  className?: string;
}> = ({ 
  title = 'Tidak ada data',
  message = 'Tidak ada data yang ditemukan',
  onReset,
  resetLabel = 'Reset Filter',
  icon = '📭',
  className = 'py-12'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="text-seltronik-red hover:underline font-medium"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
};
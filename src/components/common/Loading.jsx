import React from 'react';
import { Loader2, Plane } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

/**
 * Reusable Loading Component supporting:
 * - Spinner mode (inline or full page)
 * - Card skeleton grid mode for airport lists
 * - Detail skeleton mode
 */
export function Loading({
  type = 'spinner',
  text = 'Loading airport data...',
  count = 6,
  fullPage = false,
}) {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-xl border bg-card p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-7 w-20 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="pt-4 border-t flex justify-between items-center">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'details') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-xl border">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-sky-600" />
        <Plane className="h-4 w-4 text-sky-600 absolute" />
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {text}
      </p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
}

export default Loading;

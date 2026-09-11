import React from 'react';
import { PlaneTakeoff } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * Reusable Empty State component when search queries or filters yield no results.
 */
export function EmptyState({
  title = 'No airports found',
  description = 'We could not find any airports matching your search criteria or filters.',
  actionLabel,
  onAction,
  icon: Icon = PlaneTakeoff,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 my-6 max-w-2xl mx-auto shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 mb-4 ring-8 ring-sky-50/50">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="gap-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;

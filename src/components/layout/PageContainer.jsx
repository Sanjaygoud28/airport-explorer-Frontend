import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Reusable Page Container wrapper that ensures consistent
 * horizontal alignment, maximum width constraint, and responsive padding.
 */
export function PageContainer({
  children,
  className = '',
  maxWidth = 'max-w-7xl',
  noPadding = false,
}) {
  return (
    <div
      className={cn(
        'w-full mx-auto flex-1',
        maxWidth,
        noPadding ? '' : 'px-4 sm:px-6 lg:px-8 py-8 md:py-10',
        className
      )}
    >
      {children}
    </div>
  );
}

export default PageContainer;

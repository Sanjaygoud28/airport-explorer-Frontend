import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

/**
 * Reusable Error Message banner / box with optional retry callback.
 */
export function ErrorMessage({
  title = 'Something went wrong',
  message = 'Failed to load airport data. Please check your connection and try again.',
  onRetry,
  className = '',
}) {
  return (
    <div className={`my-4 w-full max-w-2xl mx-auto ${className}`}>
      <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
          <div>
            <AlertTitle className="text-red-800 dark:text-red-300 font-semibold">
              {title}
            </AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-400 mt-1">
              {message}
            </AlertDescription>
          </div>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="border-red-300 hover:bg-red-100 text-red-800 shrink-0 self-start sm:self-auto gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
}

export default ErrorMessage;

import React from 'react';
import {Button} from '@/components/ui/button';

interface StateViewProps<T> {
  loading: boolean;
  error: string | null;
  empty: boolean;
  data: T | null;
  children: React.ReactNode;
  onRetry?: () => void;
  loadingViewProps?: {
    title?: string;
    description?: string;
  };
  errorViewProps?: {
    title?: string;
    description?: string;
  };
  emptyViewProps?: {
    title?: string;
    description?: string;
  };
}

export function StateView<T>({
  loading,
  error,
  empty,
  data,
  children,
  onRetry,
  loadingViewProps,
  errorViewProps,
  emptyViewProps,
}: StateViewProps<T>) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        {loadingViewProps?.title && (
          <h2 className="text-xl font-semibold mt-4">{loadingViewProps.title}</h2>
        )}
        {loadingViewProps?.description && (
          <p className="text-gray-500 mt-2">{loadingViewProps.description}</p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">{errorViewProps?.title || 'Error'}</h2>
        <p className="text-gray-500 mt-2">{errorViewProps?.description || 'Failed to load data.'}</p>
        {onRetry && (
          <Button className="mt-4" onClick={onRetry}>
            Retry
          </Button>
        )}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">{emptyViewProps?.title || 'No Data'}</h2>
        <p className="text-gray-500 mt-2">{emptyViewProps?.description || 'No data available.'}</p>
      </div>
    );
  }

  return <>{children}</>;
}

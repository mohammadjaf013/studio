import React from 'react';
import {Button} from '@/components/ui/button';
import {Loader2, AlertTriangle, Inbox} from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center p-4">
        <Loader2 className="animate-spin h-10 w-10 text-primary mb-2" />
        {loadingViewProps?.title && (
          <h2 className="text-lg font-semibold text-muted-foreground mt-2">
            {loadingViewProps.title}
          </h2>
        )}
        {loadingViewProps?.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {loadingViewProps.description}
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
        <h2 className="text-lg font-semibold text-muted-foreground">
          {errorViewProps?.title || 'Error'}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {errorViewProps?.description || 'Failed to load data.'}
        </p>
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
      <div className="flex flex-col items-center justify-center p-4">
        <Inbox className="h-10 w-10 text-muted-foreground mb-2" />
        <h2 className="text-lg font-semibold text-muted-foreground">
          {emptyViewProps?.title || 'No Data'}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {emptyViewProps?.description || 'No data available.'}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}


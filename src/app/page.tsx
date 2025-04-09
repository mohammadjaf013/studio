'use client';

import {useState, useEffect} from 'react';
import {StateView} from '@/components/StateView';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
      setData('Hello from WinPredict Mini!');
    }, 1500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to WinPredict Mini!</h1>
        <StateView
          loading={loading}
          error={error}
          empty={!data}
          data={data}
          onRetry={() => {
            setLoading(true);
            setError(null);
            setTimeout(() => {
              setLoading(false);
              setData('Hello from WinPredict Mini!');
            }, 1500);
          }}
          loadingViewProps={{
            title: 'Loading WinPredict Mini...',
          }}
          emptyViewProps={{
            title: 'No data to display',
            description: 'Please try again later.',
          }}
          errorViewProps={{
            title: 'Failed to load WinPredict Mini',
            description: error || 'Something went wrong.',
          }}
        >
          <p className="mt-3 text-2xl">{data}</p>
        </StateView>
      </main>
    </div>
  );
}

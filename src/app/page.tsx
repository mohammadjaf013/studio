'use client';

import TelegramAuth, {TelegramUserData} from '@/app/auth/telegram-auth';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function Home() {
  const [userData, setUserData] = useState<TelegramUserData | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      router.push('/winpredict');
    }
  }, [userData, router]);

  const handleAuthSuccess = (userData: TelegramUserData) => {
    setUserData(userData);
    setAuthError(null);
  };

  const handleAuthError = (error: string) => {
    setAuthError(error);
    setUserData(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">WinPredict Mini</h1>
        {!userData ? (
          <TelegramAuth onAuthSuccess={handleAuthSuccess} onAuthError={handleAuthError} />
        ) : (
          <p>Authenticated. Redirecting...</p>
        )}
        {authError && <p className="text-red-500">Authentication Error: {authError}</p>}
      </main>
    </div>
  );
}

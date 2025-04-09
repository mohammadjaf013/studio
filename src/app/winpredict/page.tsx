'use client';

import React, {useState} from 'react';
import TelegramAuth, {TelegramUserData} from '@/app/auth/telegram-auth';
import Wallet from '@/components/Wallet';
import PredictionContest from '@/components/PredictionContest';
import Insights from '@/components/Insights';

const WinPredictPage: React.FC = () => {
  const [userData, setUserData] = useState<TelegramUserData | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleAuthSuccess = (userData: TelegramUserData) => {
    setUserData(userData);
    setAuthError(null);
  };

  const handleAuthError = (error: string) => {
    setAuthError(error);
    setUserData(null);
  };

  const handlePredict = (contestId: string, prediction: boolean) => {
    console.log(`User predicted ${prediction} for contest ${contestId}`);
  };

  const predictionHistory = [
    {
      contestId: 'contest1',
      prediction: true,
      outcome: true,
      winCoinWagered: 10,
    },
    {
      contestId: 'contest2',
      prediction: false,
      outcome: false,
      winCoinWagered: 5,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">WinPredict Mini</h1>
      {!userData ? (
        <TelegramAuth onAuthSuccess={handleAuthSuccess} onAuthError={handleAuthError} />
      ) : (
        <>
          <p className="mb-4">
            Welcome, {userData.first_name} {userData.last_name}!
          </p>
          <Wallet userId={userData.id} />
          <PredictionContest contestId="current_contest" onPredict={handlePredict} />
          <Insights userId={userData.id} predictionHistory={predictionHistory} />
        </>
      )}
      {authError && <p className="text-red-500">Authentication Error: {authError}</p>}
    </div>
  );
};

export default WinPredictPage;

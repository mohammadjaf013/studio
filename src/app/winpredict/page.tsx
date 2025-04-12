'use client';

import React from 'react';
import Wallet from '@/components/Wallet';
import PredictionContest from '@/components/PredictionContest';
import Insights from '@/components/Insights';
import {TelegramUserData} from '@/services/telegram';

// Dummy TelegramUserData to remove error
const dummyUserData: TelegramUserData = {
  id: 123456789,
  first_name: 'John',
  last_name: 'Doe',
  username: 'johndoe',
  language_code: 'en',
};

const WinPredictPage: React.FC = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">WinPredict Mini</h1>
        <div className="w-full max-w-md">
          <p className="mb-4 text-lg">
            Welcome, {dummyUserData.first_name} {dummyUserData.last_name}!
          </p>
          <Wallet userId={dummyUserData.id} />
          <PredictionContest contestId="current_contest" onPredict={handlePredict} />
          <Insights userId={dummyUserData.id} predictionHistory={predictionHistory} />
        </div>
      </main>
    </div>
  );
};

export default WinPredictPage;

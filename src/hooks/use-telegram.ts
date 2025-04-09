// hooks/use-telegram.ts
import {useEffect, useState} from 'react';

interface TelegramWebApp {
  WebApp: {
    initData: string;
    ready: () => void;
  };
}

declare global {
  interface Window {
    Telegram: TelegramWebApp;
  }
}

function useTelegramAuth() {
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      setInitData(window.Telegram.WebApp.initData);
      window.Telegram.WebApp.ready();
    }
  }, []);

  return {initData};
}

export default useTelegramAuth;

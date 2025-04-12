'use client';

import {useState, useEffect} from 'react';
import {validateTelegramInitData, TelegramUserData} from '@/services/telegram';
import {useToast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';

interface TelegramAuthProps {
  onAuthSuccess: (userData: TelegramUserData) => void;
  onAuthError: (error: string) => void;
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({onAuthSuccess, onAuthError}) => {
  const [tg, setTg] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      setTg(window.Telegram.WebApp);
    }
  }, []);

  useEffect(() => {
    if (!tg) return;

    const authenticate = async () => {
      setLoading(true);
      try {
        let userData: TelegramUserData;
        if (tg.initData === '') {
          // Mock user data for testing in non-Telegram environments
          userData = {
            id: 123456789,
            first_name: 'Mock',
            last_name: 'User',
            username: 'mockuser',
            language_code: 'en',
            photo_url: 'https://example.com/photo.jpg',
          };
          toast({
            title: 'Telegram Mock Authentication Success',
            description: `Welcome, Mock User!`,
          });
        } else {
          userData = await validateTelegramInitData(tg.initData);
          toast({title: 'Telegram Authentication Success', description: `Welcome, ${userData.first_name}!`});
        }
        onAuthSuccess(userData);
      } catch (error: any) {
        console.error('Telegram Authentication Failed:', error);
        toast({
          title: 'Telegram Authentication Failed',
          description: error.message || 'Invalid initData.',
          variant: 'destructive',
        });
        onAuthError(error.message || 'Invalid initData.');
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [tg, onAuthSuccess, onAuthError, toast]);

  return (
    <div className="flex justify-center items-center h-full">
      {loading ? (
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      ) : (
        <p>Authenticating with Telegram...</p>
      )}
    </div>
  );
};

export default TelegramAuth;
    

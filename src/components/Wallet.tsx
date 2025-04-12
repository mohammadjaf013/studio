import React, {useState, useEffect} from 'react';
import {getWalletBalance, WalletBalance} from '@/services/wincoin';
import {StateView} from '@/components/StateView';
import {Coins, Gem, CreditCard} from 'lucide-react';

interface WalletProps {
  userId: number;
}

const Wallet: React.FC<WalletProps> = ({userId}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      setLoading(true);
      try {
        const balance = await getWalletBalance(userId);
        setWalletBalance(balance);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch wallet balance.');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();
  }, [userId]);

  return (
    <div className="p-4 rounded-lg shadow-md bg-secondary">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Wallet Balance</h2>
      <StateView
        loading={loading}
        error={error}
        empty={!walletBalance}
        data={walletBalance}
        onRetry={() => {
          setLoading(true);
          setError(null);
          fetchWalletBalance();
        }}
        loadingViewProps={{
          title: 'Loading Wallet Balance...',
        }}
        emptyViewProps={{
          title: 'Could not load wallet',
          description: 'Please try again later.',
        }}
        errorViewProps={{
          title: 'Error loading wallet',
          description: error || 'Something went wrong.',
        }}
      >
        {walletBalance && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="font-medium flex items-center text-muted-foreground">
                <CreditCard className="w-4 h-4 mr-2" />
                WinCoin:
              </div>
              <p className="text-foreground">{walletBalance.winCoin}</p>
            </div>
            <div>
              <div className="font-medium flex items-center text-muted-foreground">
                <Coins className="w-4 h-4 mr-2" />
                Wincent:
              </div>
              <p className="text-foreground">{walletBalance.wincent}</p>
            </div>
            <div>
              <div className="font-medium flex items-center text-muted-foreground">
                <Gem className="w-4 h-4 mr-2" />
                Wingem:
              </div>
              <p className="text-foreground">{walletBalance.wingem}</p>
            </div>
          </div>
        )}
      </StateView>
    </div>
  );
};

export default Wallet;

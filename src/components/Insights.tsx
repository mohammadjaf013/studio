import React, {useState, useEffect} from 'react';
import {generateContestInsights, GenerateContestInsightsInput} from '@/ai/flows/generate-contest-insights';
import {StateView} from '@/components/StateView';

interface InsightsProps {
  userId: number;
  predictionHistory: GenerateContestInsightsInput['predictionHistory'];
}

const Insights: React.FC<InsightsProps> = ({userId, predictionHistory}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const input: GenerateContestInsightsInput = {userId, predictionHistory};
        const result = await generateContestInsights(input);
        setInsights(result.insights);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch insights.');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [userId, predictionHistory]);

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Insights</h2>
      <StateView
        loading={loading}
        error={error}
        empty={!insights}
        data={insights}
        onRetry={() => {
          setLoading(true);
          setError(null);
          fetchInsights();
        }}
        loadingViewProps={{
          title: 'Loading Insights...',
        }}
        emptyViewProps={{
          title: 'No insights available',
          description: 'Make some predictions to generate insights.',
        }}
        errorViewProps={{
          title: 'Error loading insights',
          description: error || 'Something went wrong.',
        }}
      >
        {insights && <p>{insights}</p>}
      </StateView>
    </div>
  );
};

export default Insights;

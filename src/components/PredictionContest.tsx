import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {ThumbsUp, ThumbsDown} from 'lucide-react';

interface PredictionContestProps {
  contestId: string;
  onPredict: (contestId: string, prediction: boolean) => void;
}

const PredictionContest: React.FC<PredictionContestProps> = ({contestId, onPredict}) => {
  const [prediction, setPrediction] = useState<boolean | null>(null);
  const {toast} = useToast();

  const handlePredict = (value: boolean) => {
    setPrediction(value);
    onPredict(contestId, value);
    toast({
      title: 'Prediction Submitted',
      description: `You predicted ${value ? 'Yes' : 'No'} for contest ${contestId}.`,
    });
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-secondary">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Prediction Contest</h2>
      <p className="mb-4 text-muted-foreground">Predict the outcome of contest: {contestId}</p>
      <div className="flex justify-around">
        <Button
          variant={prediction === true ? 'secondary' : 'outline'}
          onClick={() => handlePredict(true)}
          disabled={prediction !== null}
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          Yes
        </Button>
        <Button
          variant={prediction === false ? 'secondary' : 'outline'}
          onClick={() => handlePredict(false)}
          disabled={prediction !== null}
        >
          <ThumbsDown className="w-4 h-4 mr-2" />
          No
        </Button>
      </div>
    </div>
  );
};

export default PredictionContest;

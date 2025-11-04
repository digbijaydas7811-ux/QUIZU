import React from 'react';

interface ScoreSummaryProps {
  points: number;
  totalQuestions: number;
  accuracy: number;
  avgTime: number;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({ points, totalQuestions, accuracy, avgTime }) => {
  return (
    <div className="bg-neutral p-6 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-400">Total Points</p>
          <p className="text-3xl font-bold text-accent">{points}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Accuracy</p>
          <p className="text-3xl font-bold text-success">{accuracy.toFixed(0)}%</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-sm text-gray-400">Avg. Time</p>
          <p className="text-3xl font-bold text-info">{avgTime.toFixed(1)}s</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreSummary;
import React from 'react';
import { useUser } from '../hooks/useUser';

interface LeaderboardScreenProps {
  onGoHome: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onGoHome }) => {
  const { leaderboard } = useUser();

  return (
    <div className="w-full text-center animate-fade-in">
      <h2 className="text-4xl font-bold mb-6">Leaderboard</h2>
      <div className="bg-neutral rounded-xl shadow-lg p-4 md:p-6 max-h-[60vh] overflow-y-auto">
        {leaderboard.length > 0 ? (
          <ol className="space-y-3 text-left">
            {leaderboard.map((entry, index) => (
              <li key={entry.id} className="grid grid-cols-12 gap-2 items-center bg-base-100 p-3 rounded-lg">
                <span className="col-span-1 text-lg font-bold text-accent">#{index + 1}</span>
                <div className="col-span-6">
                  <p className="font-semibold text-gray-200 truncate">{entry.name}</p>
                  <p className="text-xs text-gray-400 truncate">{entry.category}</p>
                </div>
                <p className="col-span-5 text-right font-bold text-xl text-yellow-400">{entry.points} pts</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-400 py-8">No scores yet. Play a quiz to get on the leaderboard!</p>
        )}
      </div>
      <button
        onClick={onGoHome}
        className="mt-8 px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-lg transition-colors duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default LeaderboardScreen;

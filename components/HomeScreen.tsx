import React from 'react';
import LevelIndicator from './LevelIndicator';

interface HomeScreenProps {
  onStartQuiz: () => void;
  onShowLeaderboard: () => void;
  onShowSettings: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartQuiz, onShowLeaderboard, onShowSettings }) => {
  return (
    <div className="text-center animate-fade-in flex flex-col items-center w-full">
      <LevelIndicator />
      <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 my-4">
        Quizu
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md">
        Test your knowledge across various categories. Are you ready for the challenge?
      </p>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={onStartQuiz}
          className="w-full px-8 py-4 bg-accent hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out text-xl"
        >
          Start Quiz
        </button>
        <button
          onClick={onShowLeaderboard}
          className="w-full px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-md transition-colors duration-300"
        >
          Leaderboard
        </button>
        <button
          onClick={onShowSettings}
          className="w-full px-8 py-3 bg-neutral hover:bg-gray-800 text-white font-bold rounded-full shadow-md transition-colors duration-300"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
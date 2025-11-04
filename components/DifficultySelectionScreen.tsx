import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectionScreenProps {
  onDifficultySelect: (difficulty: Difficulty) => void;
}

const DifficultySelectionScreen: React.FC<DifficultySelectionScreenProps> = ({ onDifficultySelect }) => {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-4xl font-bold text-gray-100 mb-8">Choose a Difficulty</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <button
          onClick={() => onDifficultySelect(Difficulty.Easy)}
          className="w-full md:w-auto px-10 py-5 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-xl"
        >
          Easy
        </button>
        <button
          onClick={() => onDifficultySelect(Difficulty.Medium)}
          className="w-full md:w-auto px-10 py-5 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-xl"
        >
          Medium
        </button>
        <button
          onClick={() => onDifficultySelect(Difficulty.Hard)}
          className="w-full md:w-auto px-10 py-5 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-xl"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultySelectionScreen;
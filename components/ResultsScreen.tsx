import React, { useEffect, useMemo } from 'react';
import { QuizResult, LeaderboardEntry } from '../types';
import ScoreSummary from './ScoreSummary';
import { useUser } from '../hooks/useUser';

interface ResultsScreenProps {
  results: QuizResult[];
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onPlayAgain, onGoHome }) => {
  const { user, setUser, addLeaderboardEntry } = useUser();

  const { totalPoints, correctAnswers, totalQuestions, accuracy, avgTime, category } = useMemo(() => {
    const totalPoints = results.reduce((acc, r) => acc + r.points, 0);
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const totalQuestions = results.length;
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const avgTime = totalQuestions > 0 ? results.reduce((acc, r) => acc + r.timeTaken, 0) / totalQuestions : 0;
    const category = results.length > 0 ? results[0].question.category : 'General';
    return { totalPoints, correctAnswers, totalQuestions, accuracy, avgTime, category };
  }, [results]);

  useEffect(() => {
    if (totalPoints > 0) {
      // Add entry to leaderboard
      const newEntry: LeaderboardEntry = {
        id: `${user.name}-${Date.now()}`,
        name: user.name || 'Guest',
        points: totalPoints,
        category: category,
        date: new Date().toISOString(),
      };
      addLeaderboardEntry(newEntry);

      // Update user XP and level
      const xpGained = totalPoints;
      const currentXp = user.xp + xpGained;
      const xpToNextLevel = user.level * 100;
      
      if (currentXp >= xpToNextLevel) {
        setUser({ ...user, level: user.level + 1, xp: currentXp - xpToNextLevel });
        // TODO: Add a level up notification
      } else {
        setUser({ ...user, xp: currentXp });
      }
    }
  }, [totalPoints, category, user, setUser, addLeaderboardEntry]);

  return (
    <div className="text-center animate-fade-in w-full">
      <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
      <ScoreSummary points={totalPoints} totalQuestions={totalQuestions} accuracy={accuracy} avgTime={avgTime} />
      
      <div className="my-8 space-y-4 max-h-96 overflow-y-auto pr-2">
        <h3 className="text-2xl font-semibold">Review Your Answers</h3>
        {results.map((result, index) => (
          <div key={index} className={`p-4 rounded-lg text-left ${result.isCorrect ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
            <p className="font-bold text-gray-200">{index + 1}. {result.question.question}</p>
            <p className="mt-1">
              <span className="font-semibold text-gray-300">Points: {result.points}</span>
            </p>
            <p className={`mt-2 ${result.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              Your answer: {result.selectedAnswer === -1 ? 'Not answered' : result.question.options[result.selectedAnswer]}
            </p>
            {!result.isCorrect && (
              <p className="text-green-300">Correct answer: {result.question.options[result.question.answerIndex]}</p>
            )}
             <p className="text-sm text-gray-400 mt-2 italic">{result.question.explanation}</p>
             {result.question.sources && result.question.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                    <h4 className="font-semibold text-sm text-gray-300 mb-2">Sources from Google Search:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {result.question.sources.map((source, sIndex) => (
                            <li key={sIndex} className="text-sm truncate">
                                <a 
                                  href={source.uri} 
                                  title={source.title}
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-blue-400 hover:underline"
                                >
                                    {source.title || source.uri}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
             )}
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-accent hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-colors duration-300"
        >
          Play Again
        </button>
        <button
          onClick={onGoHome}
          className="px-6 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-lg transition-colors duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
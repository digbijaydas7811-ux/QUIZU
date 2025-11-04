import React, { useState, useCallback } from 'react';
import { GameState, QuizResult, Difficulty, LeaderboardEntry } from './types';
import HomeScreen from './components/HomeScreen';
import CategorySelectionScreen from './components/CategorySelectionScreen';
import DifficultySelectionScreen from './components/DifficultySelectionScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import SettingsScreen from './components/SettingsScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  const handleStartQuiz = useCallback(() => setGameState(GameState.CATEGORY_SELECTION), []);
  const handleShowLeaderboard = useCallback(() => setGameState(GameState.LEADERBOARD), []);
  const handleShowSettings = useCallback(() => setGameState(GameState.SETTINGS), []);

  const handleCategorySelect = useCallback((selectedCategory: string) => {
    setCategory(selectedCategory);
    setGameState(GameState.DIFFICULTY_SELECTION);
  }, []);

  const handleDifficultySelect = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState(GameState.QUIZ);
  }, []);

  const handleQuizComplete = useCallback((results: QuizResult[]) => {
    setQuizResults(results);
    setGameState(GameState.RESULTS);
  }, []);
  
  const handlePlayAgain = useCallback(() => {
    setCategory('');
    setQuizResults([]);
    setGameState(GameState.CATEGORY_SELECTION);
  }, []);

  const handleGoHome = useCallback(() => {
    setCategory('');
    setQuizResults([]);
    setGameState(GameState.HOME);
  }, []);
  
  const renderScreen = () => {
    switch (gameState) {
      case GameState.HOME:
        return <HomeScreen onStartQuiz={handleStartQuiz} onShowLeaderboard={handleShowLeaderboard} onShowSettings={handleShowSettings} />;
      case GameState.CATEGORY_SELECTION:
        return <CategorySelectionScreen onCategorySelect={handleCategorySelect} onGoHome={handleGoHome} />;
      case GameState.DIFFICULTY_SELECTION:
        return <DifficultySelectionScreen onDifficultySelect={handleDifficultySelect} />;
      case GameState.QUIZ:
        return <QuizScreen category={category} difficulty={difficulty} onQuizComplete={handleQuizComplete} />;
      case GameState.RESULTS:
        return <ResultsScreen results={quizResults} onPlayAgain={handlePlayAgain} onGoHome={handleGoHome} />;
      case GameState.LEADERBOARD:
        return <LeaderboardScreen onGoHome={handleGoHome} />;
      case GameState.SETTINGS:
        return <SettingsScreen onGoHome={handleGoHome} />;
      default:
        return <HomeScreen onStartQuiz={handleStartQuiz} onShowLeaderboard={handleShowLeaderboard} onShowSettings={handleShowSettings} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 font-sans flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-2xl mx-auto">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
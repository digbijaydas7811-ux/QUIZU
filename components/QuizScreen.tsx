import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizResult, Difficulty } from '../types';
import QuizService from '../services/quizService';
import QuizCard from './QuizCard';
import QuizCardSkeleton from './QuizCardSkeleton';
import ErrorDisplay from './ErrorDisplay';
import Timer from './Timer';
import { useUser } from '../hooks/useUser';

interface QuizScreenProps {
  category: string;
  difficulty: Difficulty;
  onQuizComplete: (results: QuizResult[]) => void;
}

const QUESTION_TIME_LIMIT = 20; // seconds
const POINTS_MAP = {
  [Difficulty.Easy]: 10,
  [Difficulty.Medium]: 20,
  [Difficulty.Hard]: 30,
};
const TIME_BONUS_MAX = 5;

const QuizScreen: React.FC<QuizScreenProps> = ({ category, difficulty, onQuizComplete }) => {
  const { user } = useUser();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedQuestions = await QuizService.fetchQuestions(category, difficulty, user);
        if (fetchedQuestions.length === 0) {
          setError(`No questions found for the "${category}" category.`);
        } else {
          setQuestions(fetchedQuestions);
          setStartTime(Date.now());
          setTimerKey(prev => prev + 1);
        }
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [category, difficulty, user]);

  const handleNextQuestion = useCallback((selectedAnswer: number) => {
    const question = questions[currentQuestionIndex];
    const timeTaken = Math.min((Date.now() - startTime) / 1000, QUESTION_TIME_LIMIT);
    const isCorrect = selectedAnswer === question.answerIndex;

    let points = 0;
    if (isCorrect) {
      const basePoints = POINTS_MAP[question.difficulty] || POINTS_MAP[Difficulty.Medium];
      const timeBonus = Math.round(TIME_BONUS_MAX * ((QUESTION_TIME_LIMIT - timeTaken) / QUESTION_TIME_LIMIT));
      points = basePoints + timeBonus;
    }
    
    const result: QuizResult = { question, selectedAnswer, isCorrect, timeTaken, points };
    const updatedResults = [...results, result];
    setResults(updatedResults);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStartTime(Date.now());
      setTimerKey(prev => prev + 1);
    } else {
      onQuizComplete(updatedResults);
    }
  }, [currentQuestionIndex, questions, onQuizComplete, results, startTime]);

  const handleTimeUp = useCallback(() => {
    handleNextQuestion(-1); // -1 indicates no answer was selected
  }, [handleNextQuestion]);

  if (loading) return <QuizCardSkeleton />;
  if (error) return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />;

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <ErrorDisplay message="Quiz over or error loading question." />;
  
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full animate-slide-in">
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-300">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <Timer key={timerKey} duration={QUESTION_TIME_LIMIT} onTimeUp={handleTimeUp} />
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-accent h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
        </div>
        
        <QuizCard
            question={currentQuestion}
            onAnswerSelect={handleNextQuestion}
        />
    </div>
  );
};

export default QuizScreen;
export interface Source {
  uri: string;
  title: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  category: string;
  difficulty: Difficulty;
  explanation: string;
  sources?: Source[];
}

export interface QuizResult {
  question: Question;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
  points: number;
}

export interface Settings {
  name: string;
  class: string;
  language: string;
}

export interface User extends Settings {
  level: number;
  xp: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  category: string;
  date: string;
}

export enum GameState {
  HOME,
  CATEGORY_SELECTION,
  DIFFICULTY_SELECTION,
  QUIZ,
  RESULTS,
  LEADERBOARD,
  SETTINGS,
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}
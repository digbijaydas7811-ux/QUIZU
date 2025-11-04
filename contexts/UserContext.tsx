import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, LeaderboardEntry } from '../types';

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  leaderboard: LeaderboardEntry[];
  addLeaderboardEntry: (entry: LeaderboardEntry) => void;
}

const defaultUser: User = {
  name: 'Guest',
  class: '6th Grade',
  language: 'English',
  level: 1,
  xp: 0,
};

// Helper to get data from localStorage
const getStoredData = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User>(() => getStoredData('quizu_user', defaultUser));
  const [leaderboard, setLeaderboardState] = useState<LeaderboardEntry[]>(() => getStoredData('quizu_leaderboard', []));

  useEffect(() => {
    try {
      window.localStorage.setItem('quizu_user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }, [user]);

  useEffect(() => {
    try {
      window.localStorage.setItem('quizu_leaderboard', JSON.stringify(leaderboard));
    } catch (error) {
      console.error('Error saving leaderboard to localStorage:', error);
    }
  }, [leaderboard]);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const addLeaderboardEntry = useCallback((newEntry: LeaderboardEntry) => {
    setLeaderboardState(prevLeaderboard => {
      const updatedLeaderboard = [...prevLeaderboard, newEntry];
      // Sort by points descending and keep top 20
      updatedLeaderboard.sort((a, b) => b.points - a.points);
      return updatedLeaderboard.slice(0, 20);
    });
  }, []);

  const value = { user, setUser, leaderboard, addLeaderboardEntry };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

import React from 'react';
import { useUser } from '../hooks/useUser';

const LevelIndicator: React.FC = () => {
  const { user } = useUser();
  const xpToNextLevel = user.level * 100;
  const progressPercentage = xpToNextLevel > 0 ? (user.xp / xpToNextLevel) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto bg-neutral p-3 rounded-xl shadow-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-200">{user.name}</span>
        <span className="font-bold text-accent">Level {user.level}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-accent h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' }}
        ></div>
      </div>
      <p className="text-right text-xs text-gray-400 mt-1">{user.xp} / {xpToNextLevel} XP</p>
    </div>
  );
};

export default LevelIndicator;

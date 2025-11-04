
import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const colorClass = percentage > 50 ? 'text-green-400' : percentage > 25 ? 'text-yellow-400' : 'text-red-500';

  return (
    <div className={`font-bold text-lg ${colorClass}`}>
      Time Left: {timeLeft}s
    </div>
  );
};

export default Timer;

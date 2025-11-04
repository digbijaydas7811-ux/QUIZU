
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/50 text-red-300 p-6 rounded-lg text-center shadow-lg">
      <h3 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h3>
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2 bg-error hover:bg-red-700 text-white font-bold rounded-full transition-colors duration-300"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;

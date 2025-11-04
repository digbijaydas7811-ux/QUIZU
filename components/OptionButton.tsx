
import React from 'react';

interface OptionButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({ text, onClick, disabled, isSelected, isCorrect, isIncorrect }) => {
    const getButtonClasses = () => {
        let baseClasses = 'w-full text-left p-4 rounded-lg font-semibold transition-all duration-300 ease-in-out transform';

        if (disabled) {
            baseClasses += ' cursor-not-allowed';
            if (isCorrect) {
                return `${baseClasses} bg-success text-white scale-105 shadow-lg`;
            }
            if (isIncorrect) {
                return `${baseClasses} bg-error text-white`;
            }
            if (isSelected) {
                 return `${baseClasses} bg-gray-600 text-gray-400`;
            }
            return `${baseClasses} bg-primary text-gray-300`;
        }
        
        return `${baseClasses} bg-primary hover:bg-secondary hover:scale-102 text-white`;
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={getButtonClasses()}
        >
            {text}
        </button>
    );
};

export default OptionButton;


import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import OptionButton from './OptionButton';

interface QuizCardProps {
  question: Question;
  onAnswerSelect: (selectedAnswer: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswerSelect }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        setSelectedOption(null);
        setIsAnswered(false);
    }, [question]);

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        
        setSelectedOption(index);
        setIsAnswered(true);

        setTimeout(() => {
            onAnswerSelect(index);
        }, 1000); // Wait 1 second to show feedback before moving to the next question
    };
    
    return (
        <div className="bg-neutral p-6 md:p-8 rounded-xl shadow-2xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100">{question.question}</h2>
            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <OptionButton
                        key={index}
                        text={option}
                        onClick={() => handleOptionClick(index)}
                        disabled={isAnswered}
                        isSelected={selectedOption === index}
                        isCorrect={isAnswered && index === question.answerIndex}
                        isIncorrect={isAnswered && selectedOption === index && index !== question.answerIndex}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuizCard;

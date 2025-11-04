import React, { useState, useEffect } from 'react';
import QuizService from '../services/quizService';
import CategorySkeleton from './CategorySkeleton';
import ErrorDisplay from './ErrorDisplay';
import LevelIndicator from './LevelIndicator';

interface CategorySelectionScreenProps {
  onCategorySelect: (category: string) => void;
  onGoHome: () => void;
}

const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({ onCategorySelect, onGoHome }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setError(null);
        setLoading(true);
        const fetchedCategories = await QuizService.getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError('Could not load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) {
    return <CategorySkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="text-center animate-fade-in w-full">
      <LevelIndicator />
      <h2 className="text-4xl font-bold text-gray-100 my-8">Choose a Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className="p-6 bg-primary hover:bg-secondary text-white font-semibold rounded-lg shadow-md transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-lg"
          >
            {category}
          </button>
        ))}
      </div>
      <button
        onClick={onGoHome}
        className="mt-8 px-6 py-2 bg-neutral hover:bg-gray-800 text-white font-bold rounded-full shadow-lg transition-colors duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default CategorySelectionScreen;
import React from 'react';
import { Question } from '../types/question';

interface QuestionExplanationProps {
  question: Question;
  isCorrect: boolean;
  showResult: boolean;
}

export const QuestionExplanation: React.FC<QuestionExplanationProps> = ({
  question,
  isCorrect,
  showResult,
}) => {
  if (!showResult) return null;

  return (
    <div className={`mt-4 p-4 rounded-lg ${
      isCorrect
        ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
        : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
    }`}>
      <p className="text-sm font-semibold mb-1 text-gray-900 dark:text-gray-100">Объяснение:</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {question.explanation.split(/(https?:\/\/[^\s]+)/g).map((part, idx) => {
          if (part.match(/^https?:\/\//)) {
            return (
              <a
                key={idx}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {part}
              </a>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </p>
    </div>
  );
};


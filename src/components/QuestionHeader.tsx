import React from 'react';
import { Question } from '../types/question';

interface QuestionHeaderProps {
  question: Question;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({ question }) => {
  const isMultiple = question.type === 'multiple';
  const isCode = question.type === 'code';

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${
          question.difficulty === 'Легкий' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
          question.difficulty === 'Средний' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300' :
          'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
        }`}>
          {question.difficulty}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {question.category}
          </span>
          <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">
            {isCode ? 'Сравнение кода' : isMultiple ? 'Несколько ответов' : 'Один ответ'}
          </span>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        {question.question}
      </h2>
    </div>
  );
};


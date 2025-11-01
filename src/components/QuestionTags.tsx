import React from 'react';
import { Question } from '../types/question';

interface QuestionTagsProps {
  question: Question;
}

export const QuestionTags: React.FC<QuestionTagsProps> = ({ question }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {question.tags.map((tag) => (
        <span
          key={tag}
          className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};


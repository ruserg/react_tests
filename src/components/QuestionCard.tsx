import React from 'react';
import { Question } from '../types/question';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | number[] | null;
  onAnswerSelect: (answerIndex: number) => void;
  showResult: boolean;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult,
  disabled = false,
}) => {
  const isMultiple = question.type === 'multiple';
  const correctAnswers = Array.isArray(question.correctAnswer) 
    ? question.correctAnswer 
    : [question.correctAnswer];
  
  const selectedAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : 
    selectedAnswer !== null ? [selectedAnswer] : [];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Заголовок вопроса */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded ${
            question.difficulty === 'Легкий' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'Средний' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">
              {question.category}
            </span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
              {isMultiple ? 'Несколько ответов' : 'Один ответ'}
            </span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {question.question}
        </h2>
      </div>

      {/* Варианты ответов */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswers.includes(index);
          const isCorrect = correctAnswers.includes(index);
          const isWrong = isSelected && !isCorrect && showResult;

          let bgColor = 'bg-gray-50 hover:bg-gray-100';
          if (showResult) {
            if (isCorrect) bgColor = 'bg-green-100 border-green-500';
            if (isWrong) bgColor = 'bg-red-100 border-red-500';
          } else if (isSelected) {
            bgColor = 'bg-blue-100 border-blue-500';
          }

          return (
            <button
              key={index}
              onClick={() => !disabled && onAnswerSelect(index)}
              disabled={disabled}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              } ${bgColor} ${
                !disabled && !showResult ? 'hover:scale-105' : ''
              }`}
            >
              <div className="flex items-start">
                <span className="font-semibold mr-3 text-blue-600">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrect && (
                  <span className="text-green-600 text-xl">✓</span>
                )}
                {showResult && isWrong && (
                  <span className="text-red-600 text-xl">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Объяснение */}
      {showResult && (
        <div className={`mt-4 p-4 rounded-lg ${
          JSON.stringify(selectedAnswers.sort()) === JSON.stringify(correctAnswers.sort())
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <p className="text-sm font-semibold mb-1">Объяснение:</p>
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}

      {/* Теги */}
      <div className="mt-4 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};


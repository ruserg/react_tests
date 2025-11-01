import React from 'react';
import { Question } from '../types/question';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const isCode = question.type === 'code';
  const correctAnswers = Array.isArray(question.correctAnswer) 
    ? question.correctAnswer 
    : [question.correctAnswer];
  
  const selectedAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : 
    selectedAnswer !== null ? [selectedAnswer] : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      {/* Заголовок вопроса */}
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

      {/* Варианты ответов */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswers.includes(index);
          const isCorrect = correctAnswers.includes(index);
          const isWrong = isSelected && !isCorrect && showResult;

          let bgColor = 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600';
          if (showResult) {
            if (isCorrect) bgColor = 'bg-green-100 dark:bg-green-900/50 border-green-500 dark:border-green-400';
            if (isWrong) bgColor = 'bg-red-100 dark:bg-red-900/50 border-red-500 dark:border-red-400';
          } else if (isSelected) {
            bgColor = 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 dark:border-blue-400';
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
                <span className="font-semibold mr-3 text-blue-600 dark:text-blue-400">
                  {String.fromCharCode(65 + index)}.
                </span>
                {isCode ? (
                  <div className="flex-1 rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language="javascript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                      }}
                    >
                      {option}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <span className="flex-1 text-gray-900 dark:text-gray-100">{option}</span>
                )}
                {showResult && isCorrect && (
                  <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                )}
                {showResult && isWrong && (
                  <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
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
      )}

      {/* Теги */}
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
    </div>
  );
};


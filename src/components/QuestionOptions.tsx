import React from 'react';
import { Question } from '../types/question';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface QuestionOptionsProps {
  question: Question;
  selectedAnswer: number | number[] | null;
  onAnswerSelect: (answerIndex: number) => void;
  showResult: boolean;
  disabled: boolean;
}

export const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult,
  disabled,
}) => {
  const isCode = question.type === 'code';
  const correctAnswers = Array.isArray(question.correctAnswer) 
    ? question.correctAnswer 
    : [question.correctAnswer];
  
  const selectedAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : 
    selectedAnswer !== null ? [selectedAnswer] : [];

  // Используем колонки только для длинного кода
  const shouldUseColumns = isCode && question.isLongCode;

  return (
    <div className={shouldUseColumns ? "grid grid-cols-1 md:grid-cols-2 gap-3 items-start" : "space-y-3"}>
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
  );
};


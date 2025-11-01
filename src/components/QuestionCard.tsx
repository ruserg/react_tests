import React from 'react';
import { Question } from '../types/question';
import { QuestionHeader } from './QuestionHeader';
import { QuestionOptions } from './QuestionOptions';
import { QuestionExplanation } from './QuestionExplanation';
import { QuestionTags } from './QuestionTags';

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
  const correctAnswers = Array.isArray(question.correctAnswer) 
    ? question.correctAnswer 
    : [question.correctAnswer];
  
  const selectedAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : 
    selectedAnswer !== null ? [selectedAnswer] : [];

  const isAnswerCorrect = JSON.stringify(selectedAnswers.sort()) === JSON.stringify(correctAnswers.sort());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <QuestionHeader question={question} />
      <QuestionOptions
        question={question}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={onAnswerSelect}
        showResult={showResult}
        disabled={disabled}
      />
      <QuestionExplanation
        question={question}
        isCorrect={isAnswerCorrect}
        showResult={showResult}
      />
      <QuestionTags question={question} />
    </div>
  );
};


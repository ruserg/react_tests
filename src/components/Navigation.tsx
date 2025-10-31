import React from 'react';

interface NavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onFinish: () => void;
  onSkip?: () => void;
  showResult?: boolean;
  disabled?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentQuestion,
  totalQuestions,
  onNext,
  onFinish,
  onSkip,
  showResult = false,
  disabled = false,
}) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Прогресс */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Вопрос {currentQuestion + 1} из {totalQuestions}
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-between items-center">
          {!showResult && onSkip ? (
            <>
              <button
                onClick={onSkip}
                className="px-4 py-3 rounded-lg font-semibold transition-all bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-md hover:shadow-lg"
              >
                Не знаю ответ
              </button>
              <button
                id="main-action-button"
                onClick={isLastQuestion ? onFinish : onNext}
                disabled={disabled}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  disabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isLastQuestion
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } shadow-md hover:shadow-lg`}
              >
                {isLastQuestion ? 'Завершить тест' : 'Проверить ответ'}
              </button>
            </>
          ) : (
            <>
              {showResult && (
                <div className="text-sm text-gray-500">
                  Прочитайте объяснение и продолжайте
                </div>
              )}
              <button
                id="main-action-button"
                onClick={isLastQuestion ? onFinish : onNext}
                disabled={false}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  isLastQuestion
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } shadow-md hover:shadow-lg`}
              >
                {isLastQuestion ? 'Завершить тест' : 'Следующий вопрос'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


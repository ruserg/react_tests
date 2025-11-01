import React from 'react';

interface NavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onFinish: () => void;
  onSkip?: () => void;
  showResult?: boolean;
  disabled?: boolean;
  elapsedTime?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentQuestion,
  totalQuestions,
  onNext,
  onFinish,
  onSkip,
  showResult = false,
  disabled = false,
  elapsedTime = 0,
}) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Прогресс и таймер */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Вопрос {currentQuestion + 1} из {totalQuestions}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                ⏱️ {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-300"
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
                className="px-4 py-3 rounded-lg font-semibold transition-all bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg"
              >
                Не знаю ответ
              </button>
              <button
                id="main-action-button"
                onClick={isLastQuestion ? onFinish : onNext}
                disabled={disabled}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  disabled
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : isLastQuestion
                    ? 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white'
                    : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white'
                } shadow-md hover:shadow-lg`}
              >
                {isLastQuestion ? 'Завершить тест' : 'Проверить ответ'}
              </button>
            </>
          ) : (
            <>
              {showResult && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Прочитайте объяснение и продолжайте
                </div>
              )}
              <button
                id="main-action-button"
                onClick={isLastQuestion ? onFinish : onNext}
                disabled={false}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  isLastQuestion
                    ? 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white'
                    : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white'
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


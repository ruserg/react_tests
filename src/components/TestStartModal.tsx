import React from 'react';
import { TestMode } from '../types/question';

interface TestStartModalProps {
  isOpen: boolean;
  mode: TestMode;
  questionCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const TestStartModal: React.FC<TestStartModalProps> = ({
  isOpen,
  mode,
  questionCount,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Начать тест?
          </h2>
          
          <div className="mb-6">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-3 font-bold text-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                {mode.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1">
                  {mode.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mode.description}
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Количество вопросов:
                </span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {questionCount}
                </span>
              </div>
              {mode.difficulty && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Сложность:
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    mode.difficulty === 'Легкий' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
                    mode.difficulty === 'Средний' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
                  }`}>
                    {mode.difficulty}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors font-semibold"
            >
              Отмена
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold"
            >
              Начать тест
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


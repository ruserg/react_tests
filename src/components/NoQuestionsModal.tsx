import React from 'react';

interface NoQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NoQuestionsModal: React.FC<NoQuestionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Вопросы не найдены
          </h2>
          
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              По выбранным фильтрам не найдено вопросов для теста.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Попробуйте изменить фильтры:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
              <li>Выберите другую категорию</li>
              <li>Измените уровень сложности</li>
              <li>Уберите некоторые теги</li>
            </ul>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold"
            >
              Понятно
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


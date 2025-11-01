import React from 'react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Esc', description: 'Не знаю ответ (пропустить вопрос)' },
    { key: 'Enter', description: 'Проверить ответ / Следующий вопрос' },
    { key: 'Ctrl/Cmd + K', description: 'Переключить тему (день/ночь)' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Горячие клавиши
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.key} className="flex items-start justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <span className="text-sm text-gray-700 dark:text-gray-300 pr-4">
                  {shortcut.description}
                </span>
                <kbd className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-semibold border border-gray-300 dark:border-gray-600">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


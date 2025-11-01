import React from 'react';
import { TestMode } from '../types/question';

interface TestModeSelectorProps {
  modes: TestMode[];
  selectedMode: TestMode | null;
  onModeSelect: (mode: TestMode | null) => void;
}

export const TestModeSelector: React.FC<TestModeSelectorProps> = ({
  modes,
  selectedMode,
  onModeSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Выберите режим теста</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const isSelected = selectedMode?.id === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onModeSelect(mode)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-3 font-bold text-xl ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800 mb-1">
                    {mode.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {mode.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {mode.id === 'full' ? 'Все вопросы' : `${mode.questionCount} вопросов`}
                    </span>
                    {mode.difficulty && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        mode.difficulty === 'Легкий' ? 'bg-green-100 text-green-800' :
                        mode.difficulty === 'Средний' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {mode.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {selectedMode && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Выбран режим:</span> {selectedMode.name}
          </p>
        </div>
      )}
    </div>
  );
};


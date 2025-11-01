import React, { useState } from 'react';
import { Category, Difficulty } from '../types/question';

interface TestFiltersProps {
  selectedCategory: Category | 'Все';
  selectedDifficulty: Difficulty | 'Все';
  selectedTags: string[];
  availableTags: string[];
  onCategoryChange: (category: Category | 'Все') => void;
  onDifficultyChange: (difficulty: Difficulty | 'Все') => void;
  onTagsChange: (tags: string[]) => void;
}

const categories: (Category | 'Все')[] = [
  'Все',
  'Основы',
  'Компоненты',
  'Hooks',
  'State Management',
  'Роутинг',
  'Производительность',
  'Тестирование',
  'React 18+',
];

const difficulties: (Difficulty | 'Все')[] = ['Все', 'Легкий', 'Средний', 'Сложный'];

export const TestFilters: React.FC<TestFiltersProps> = ({
  selectedCategory,
  selectedDifficulty,
  selectedTags,
  availableTags,
  onCategoryChange,
  onDifficultyChange,
  onTagsChange,
}) => {
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Фильтры</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Категории */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Категория:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as Category | 'Все')}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Сложность */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Сложность:
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value as Difficulty | 'Все')}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Теги */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Теги:
          </label>
          <button
            onClick={() => setTagsExpanded(!tagsExpanded)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            {tagsExpanded ? 'Свернуть ▲' : 'Развернуть ▼'}
          </button>
        </div>
        {tagsExpanded && (
          <>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => onTagsChange([])}
                className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Очистить все теги
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};


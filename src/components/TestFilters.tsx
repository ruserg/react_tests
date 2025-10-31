import React from 'react';
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
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Фильтры</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Категории */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Категория:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as Category | 'Все')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
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
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Сложность:
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value as Difficulty | 'Все')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
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
        <label className="block text-sm font-semibold mb-3 text-gray-700">
          Теги:
        </label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Очистить все теги
          </button>
        )}
      </div>
    </div>
  );
};


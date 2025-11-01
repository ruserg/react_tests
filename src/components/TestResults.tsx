import React from 'react';
import { TestStats } from '../types/question';

interface TestResultsProps {
  stats: TestStats;
  onStartAgain: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ stats, onStartAgain }) => {
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500 dark:bg-green-600';
    if (percentage >= 50) return 'bg-yellow-500 dark:bg-yellow-600';
    return 'bg-red-500 dark:bg-red-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Результаты теста
      </h2>

      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats.totalQuestions}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Всего вопросов</p>
        </div>
        <div className="text-center p-6 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <p className="text-4xl font-bold text-green-600 dark:text-green-400">{stats.correctAnswers}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Правильных ответов</p>
        </div>
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <p className="text-4xl font-bold text-red-600 dark:text-red-400">{stats.wrongAnswers}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Неправильных ответов</p>
        </div>
      </div>
      
      {/* Время и скорость */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
          <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            {Math.floor(stats.duration / 60)}:{(stats.duration % 60).toString().padStart(2, '0')}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Время прохождения</p>
        </div>
        <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            {Math.round(stats.averageSpeed)}с
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Средняя скорость на вопрос</p>
        </div>
      </div>

      {/* Общий процент */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Общий результат:</span>
          <span className={`text-3xl font-bold ${getPercentageColor(stats.percentage)}`}>
            {stats.percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(stats.percentage)}`}
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
      </div>

      {/* Статистика по категориям */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">По категориям:</h3>
        <div className="space-y-3">
          {Object.entries(stats.categoryBreakdown)
            .filter(([_, data]) => data.total > 0)
            .map(([category, data]) => {
              const categoryPercentage = data.total > 0 
                ? Math.round((data.correct / data.total) * 100) 
                : 0;
              return (
                <div key={category} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{category}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {data.correct} / {data.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getProgressColor(categoryPercentage)}`}
                      style={{ width: `${categoryPercentage}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className={`text-sm font-semibold ${getPercentageColor(categoryPercentage)}`}>
                      {categoryPercentage}%
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Статистика по сложности */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">По сложности:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(stats.difficultyBreakdown)
            .filter(([_, data]) => data.total > 0)
            .map(([difficulty, data]) => {
              const difficultyPercentage = data.total > 0 
                ? Math.round((data.correct / data.total) * 100) 
                : 0;
              const bgColor = 
                difficulty === 'Легкий' ? 'bg-green-50 dark:bg-green-900/30' :
                difficulty === 'Средний' ? 'bg-yellow-50 dark:bg-yellow-900/30' :
                'bg-red-50 dark:bg-red-900/30';
              return (
                <div key={difficulty} className={`p-4 rounded-lg ${bgColor}`}>
                  <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">{difficulty}</p>
                  <p className="text-2xl font-bold mb-1">{difficultyPercentage}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{data.correct} / {data.total}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Темы для повторения */}
      {stats.topicsToReview.length > 0 && (
        <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start mb-3">
            <div className="w-8 h-8 rounded bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center mr-2">
              <span className="text-sm font-bold text-yellow-900 dark:text-yellow-200">!</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Рекомендуется повторить:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.topicsToReview.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200 rounded-full text-sm font-semibold"
              >
                {topic}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
            Обратите внимание на эти темы, чтобы улучшить свои результаты
          </p>
        </div>
      )}

      {/* Кнопка начать заново */}
      <div className="text-center">
        <button
          onClick={onStartAgain}
          className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Пройти тест заново
        </button>
      </div>
    </div>
  );
};


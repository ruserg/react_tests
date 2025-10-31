import React from 'react';
import { TestStats } from '../types/question';

interface TestResultsProps {
  stats: TestStats;
  onStartAgain: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ stats, onStartAgain }) => {
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Результаты теста
      </h2>

      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <p className="text-4xl font-bold text-blue-600">{stats.totalQuestions}</p>
          <p className="text-gray-600 mt-2">Всего вопросов</p>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <p className="text-4xl font-bold text-green-600">{stats.correctAnswers}</p>
          <p className="text-gray-600 mt-2">Правильных ответов</p>
        </div>
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-4xl font-bold text-red-600">{stats.wrongAnswers}</p>
          <p className="text-gray-600 mt-2">Неправильных ответов</p>
        </div>
      </div>

      {/* Общий процент */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-700">Общий результат:</span>
          <span className={`text-3xl font-bold ${getPercentageColor(stats.percentage)}`}>
            {stats.percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(stats.percentage)}`}
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
      </div>

      {/* Статистика по категориям */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">По категориям:</h3>
        <div className="space-y-3">
          {Object.entries(stats.categoryBreakdown)
            .filter(([_, data]) => data.total > 0)
            .map(([category, data]) => {
              const categoryPercentage = data.total > 0 
                ? Math.round((data.correct / data.total) * 100) 
                : 0;
              return (
                <div key={category} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">{category}</span>
                    <span className="text-sm text-gray-600">
                      {data.correct} / {data.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
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
        <h3 className="text-xl font-bold mb-4 text-gray-800">По сложности:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(stats.difficultyBreakdown)
            .filter(([_, data]) => data.total > 0)
            .map(([difficulty, data]) => {
              const difficultyPercentage = data.total > 0 
                ? Math.round((data.correct / data.total) * 100) 
                : 0;
              const bgColor = 
                difficulty === 'Легкий' ? 'bg-green-50' :
                difficulty === 'Средний' ? 'bg-yellow-50' :
                'bg-red-50';
              return (
                <div key={difficulty} className={`p-4 rounded-lg ${bgColor}`}>
                  <p className="font-semibold mb-2 text-gray-700">{difficulty}</p>
                  <p className="text-2xl font-bold mb-1">{difficultyPercentage}%</p>
                  <p className="text-sm text-gray-600">{data.correct} / {data.total}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Темы для повторения */}
      {stats.topicsToReview.length > 0 && (
        <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start mb-3">
            <div className="w-8 h-8 rounded bg-yellow-200 flex items-center justify-center mr-2">
              <span className="text-sm font-bold text-yellow-900">!</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Рекомендуется повторить:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.topicsToReview.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-semibold"
              >
                {topic}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-700 mt-3">
            Обратите внимание на эти темы, чтобы улучшить свои результаты
          </p>
        </div>
      )}

      {/* Кнопка начать заново */}
      <div className="text-center">
        <button
          onClick={onStartAgain}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Пройти тест заново
        </button>
      </div>
    </div>
  );
};


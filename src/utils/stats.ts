import { Question, UserAnswer, TestStats, Category, Difficulty } from '../types/question';

export function calculateStats(
  questions: Question[],
  userAnswers: UserAnswer[]
): TestStats {
  const totalQuestions = questions.length;
  
  // Подсчет правильных/неправильных ответов
  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const percentage = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100) 
    : 0;

  // Статистика по категориям
  const categoryBreakdown: Record<Category, { total: number; correct: number }> = {
    'Основы': { total: 0, correct: 0 },
    'Компоненты': { total: 0, correct: 0 },
    'Hooks': { total: 0, correct: 0 },
    'State Management': { total: 0, correct: 0 },
    'Роутинг': { total: 0, correct: 0 },
    'Производительность': { total: 0, correct: 0 },
    'Тестирование': { total: 0, correct: 0 },
    'React 18+': { total: 0, correct: 0 },
  };

  questions.forEach((question, index) => {
    const category = question.category;
    categoryBreakdown[category].total++;
    
    const userAnswer = userAnswers[index];
    if (userAnswer && userAnswer.isCorrect) {
      categoryBreakdown[category].correct++;
    }
  });

  // Статистика по сложности
  const difficultyBreakdown: Record<Difficulty, { total: number; correct: number }> = {
    'Легкий': { total: 0, correct: 0 },
    'Средний': { total: 0, correct: 0 },
    'Сложный': { total: 0, correct: 0 },
  };

  questions.forEach((question, index) => {
    const difficulty = question.difficulty;
    difficultyBreakdown[difficulty].total++;
    
    const userAnswer = userAnswers[index];
    if (userAnswer && userAnswer.isCorrect) {
      difficultyBreakdown[difficulty].correct++;
    }
  });

  // Определяем темы для повторения (категории с результатом менее 60%)
  const topicsToReview: string[] = [];
  
  Object.entries(categoryBreakdown).forEach(([category, stats]) => {
    if (stats.total > 0) {
      const categoryPercentage = (stats.correct / stats.total) * 100;
      if (categoryPercentage < 60) {
        topicsToReview.push(category);
      }
    }
  });

  return {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    percentage,
    categoryBreakdown,
    difficultyBreakdown,
    topicsToReview,
  };
}


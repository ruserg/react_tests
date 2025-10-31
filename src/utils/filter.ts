import { Question, Category, Difficulty, TestMode } from '../types/question';

export function filterQuestions(
  questions: Question[],
  category: Category | 'Все',
  difficulty: Difficulty | 'Все',
  tags: string[]
): Question[] {
  return questions.filter((question) => {
    const matchesCategory = category === 'Все' || question.category === category;
    const matchesDifficulty = difficulty === 'Все' || question.difficulty === difficulty;
    const matchesTags = tags.length === 0 || tags.some((tag) => question.tags.includes(tag));
    return matchesCategory && matchesDifficulty && matchesTags;
  });
}

export function applyTestMode(questions: Question[], mode: TestMode | null): Question[] {
  if (!mode) return questions;
  
  // Для полного теста возвращаем все вопросы без изменений
  if (mode.id === 'full') {
    return questions;
  }
  
  // Перемешиваем вопросы для случайного выбора
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  
  // Если режим имеет конкретную сложность, сначала фильтруем по сложности
  if (mode.difficulty) {
    const difficultyFiltered = shuffled.filter(
      (q) => q.difficulty === mode.difficulty
    );
    
    // Ограничиваем количество вопросов после фильтрации
    return difficultyFiltered.slice(0, mode.questionCount);
  }
  
  // Ограничиваем количество вопросов
  return shuffled.slice(0, mode.questionCount);
}


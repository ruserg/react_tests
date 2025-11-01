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

// Fisher-Yates shuffle для правильного перемешивания
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function applyTestMode(questions: Question[], mode: TestMode | null): Question[] {
  if (!mode) return questions;
  
  // Для полного теста возвращаем все вопросы без изменений
  if (mode.id === 'full') {
    return questions;
  }
  
  // Если режим имеет конкретную сложность, сначала фильтруем по сложности
  let filteredQuestions = questions;
  if (mode.difficulty) {
    filteredQuestions = questions.filter(
      (q) => q.difficulty === mode.difficulty
    );
  }
  
  // Перемешиваем вопросы для случайного выбора
  const shuffled = shuffleArray(filteredQuestions);
  
  // Если вопросов меньше нужного - дублируем массив до нужного количества
  let questionsPool = shuffled;
  while (questionsPool.length < mode.questionCount) {
    questionsPool = [...questionsPool, ...shuffled];
  }
  
  // Ограничиваем количество вопросов
  return questionsPool.slice(0, mode.questionCount);
}


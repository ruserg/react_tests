export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | number[]; // Может быть один или несколько ответов
  explanation: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  type: 'single' | 'multiple' | 'code'; // Тип вопроса: один ответ, несколько ответов или сравнение кода
}

export type Category = 
  | 'Основы'
  | 'Компоненты'
  | 'Hooks'
  | 'State Management'
  | 'Роутинг'
  | 'Производительность'
  | 'Тестирование'
  | 'React 18+';

export type Difficulty = 'Легкий' | 'Средний' | 'Сложный';

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number | number[]; // Может быть один или несколько ответов
  isCorrect: boolean;
  timestamp: number;
}

export interface TestStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  categoryBreakdown: Record<Category, { total: number; correct: number }>;
  difficultyBreakdown: Record<Difficulty, { total: number; correct: number }>;
  topicsToReview: string[]; // Темы для повторения
  duration: number; // Длительность теста в секундах
  averageSpeed: number; // Средняя скорость ответа в секундах на вопрос
}

export interface TestMode {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  difficulty?: Difficulty;
  icon: string;
}

export const testModes: TestMode[] = [
  {
    id: 'quick',
    name: 'Быстрый тест',
    description: '10 вопросов для быстрой проверки знаний',
    questionCount: 10,
    icon: 'Q',
  },
  {
    id: 'easy',
    name: 'Начальный уровень',
    description: '20 легких вопросов для новичков',
    questionCount: 20,
    difficulty: 'Легкий',
    icon: 'E',
  },
  {
    id: 'medium',
    name: 'Средний уровень',
    description: '30 вопросов средней сложности',
    questionCount: 30,
    difficulty: 'Средний',
    icon: 'M',
  },
  {
    id: 'hard',
    name: 'Продвинутый уровень',
    description: '40 сложных вопросов для экспертов',
    questionCount: 40,
    difficulty: 'Сложный',
    icon: 'H',
  },
  {
    id: 'full',
    name: 'Полный тест',
    description: 'Все доступные вопросы',
    questionCount: 1000,
    icon: 'F',
  },
];


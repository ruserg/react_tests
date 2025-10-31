import { Question, UserAnswer, Category, Difficulty, TestMode } from './question';

export interface TestStore {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  selectedCategory: Category | 'Все';
  selectedDifficulty: Difficulty | 'Все';
  selectedTags: string[];
  selectedMode: TestMode | null;
  isTestFinished: boolean;
  
  // Actions
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addUserAnswer: (answer: UserAnswer) => void;
  setSelectedCategory: (category: Category | 'Все') => void;
  setSelectedDifficulty: (difficulty: Difficulty | 'Все') => void;
  setSelectedTags: (tags: string[]) => void;
  setSelectedMode: (mode: TestMode | null) => void;
  finishTest: () => void;
  resetTest: () => void;
  nextQuestion: () => void;
}


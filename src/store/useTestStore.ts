import { create } from 'zustand';
import { TestStore } from '../types/store';
import { Question, UserAnswer, Category, Difficulty } from '../types/question';

const initialState = {
  questions: [] as Question[],
  currentQuestionIndex: 0,
  userAnswers: [] as UserAnswer[],
  selectedCategory: 'Все' as Category | 'Все',
  selectedDifficulty: 'Все' as Difficulty | 'Все',
  selectedTags: [] as string[],
  selectedMode: null,
  isTestFinished: false,
  darkMode: false,
};

const getInitialDarkMode = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  }
  return false;
};

export const useTestStore = create<TestStore>((set: any) => ({
  ...initialState,
  darkMode: getInitialDarkMode(),

  setQuestions: (questions: Question[]) => set({ questions }),
  
  setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),
  
  addUserAnswer: (answer: UserAnswer) => set((state: any) => ({
    userAnswers: [...state.userAnswers, answer],
  })),
  
  setSelectedCategory: (category: Category | 'Все') => set({ selectedCategory: category }),
  
  setSelectedDifficulty: (difficulty: Difficulty | 'Все') => set({ selectedDifficulty: difficulty }),
  
  setSelectedTags: (tags: string[]) => set({ selectedTags: tags }),
  
  setSelectedMode: (mode: any) => set({ selectedMode: mode }),
  
  finishTest: () => set({ isTestFinished: true }),
  
  resetTest: () => set((state: any) => ({ 
    ...initialState,
    darkMode: state.darkMode, // Сохраняем текущую тему
    questions: useTestStore.getState().questions, // Сохраняем вопросы
  })),
  
  nextQuestion: () => set((state: any) => {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex >= state.questions.length) {
      return { isTestFinished: true };
    }
    return { currentQuestionIndex: nextIndex };
  }),
  
  toggleDarkMode: () => set((state: any) => ({ darkMode: !state.darkMode })),
}));


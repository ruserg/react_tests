import { useEffect, useState } from 'react';
import { useTestStore } from './store/useTestStore';
import { QuestionCard } from './components/QuestionCard';
import { TestResults } from './components/TestResults';
import { TestFilters } from './components/TestFilters';
import { Navigation } from './components/Navigation';
import { TestModeSelector } from './components/TestModeSelector';
import { ThemeToggle } from './components/ThemeToggle';
import allQuestions from './data/questions';
import { calculateStats } from './utils/stats';
import { filterQuestions, applyTestMode } from './utils/filter';
import { UserAnswer, testModes } from './types/question';

function App() {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    selectedCategory,
    selectedDifficulty,
    selectedTags,
    selectedMode,
    isTestFinished,
    darkMode,
    setQuestions,
    setCurrentQuestionIndex,
    addUserAnswer,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedTags,
    setSelectedMode,
    finishTest,
    resetTest,
    nextQuestion,
    toggleDarkMode,
  } = useTestStore();

  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Загружаем вопросы при монтировании
  useEffect(() => {
    setQuestions(allQuestions);
    
    // Загружаем прогресс из localStorage
    const savedProgress = localStorage.getItem('testProgress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      if (parsed.questions && parsed.userAnswers && parsed.currentQuestionIndex !== undefined) {
        setQuestions(parsed.questions);
        // Не восстанавливаем userAnswers и currentQuestionIndex автоматически,
        // чтобы пользователь мог начать заново
      }
    }
  }, [setQuestions]);

  // Получаем уникальные теги из всех вопросов
  const availableTags = Array.from(
    new Set(allQuestions.flatMap((q) => q.tags))
  ).filter((tag) => !tag.startsWith('вариант-') && !tag.startsWith('вопрос-'));

  // Фильтруем вопросы при изменении фильтров
  useEffect(() => {
    if (allQuestions.length > 0) {
      const filtered = filterQuestions(allQuestions, selectedCategory, selectedDifficulty, selectedTags);
      // Применяем режим теста, если выбран
      const modeApplied = applyTestMode(filtered, selectedMode);
      setQuestions(modeApplied);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [selectedCategory, selectedDifficulty, selectedTags, selectedMode, setQuestions, setCurrentQuestionIndex]);

  // Сохраняем прогресс в localStorage
  useEffect(() => {
    if (questions.length > 0) {
      const progress = {
        questions,
        userAnswers,
        currentQuestionIndex,
      };
      localStorage.setItem('testProgress', JSON.stringify(progress));
    }
  }, [questions, userAnswers, currentQuestionIndex]);
  
  // Применяем темную тему к документу
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    if (!currentQuestion) return;
    
    // Поддержка множественных ответов
    if (currentQuestion.type === 'multiple') {
      const currentSelected = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      if (currentSelected.includes(answerIndex)) {
        // Убираем ответ если он уже выбран
        setSelectedAnswer(currentSelected.filter(idx => idx !== answerIndex));
      } else {
        // Добавляем ответ
        setSelectedAnswer([...currentSelected, answerIndex]);
      }
    } else {
      // Один ответ
      setSelectedAnswer(answerIndex);
    }
  };

  const checkAnswerCorrect = (): boolean => {
    if (!currentQuestion || selectedAnswer === null) return false;
    
    const correctAnswers = Array.isArray(currentQuestion.correctAnswer) 
      ? currentQuestion.correctAnswer 
      : [currentQuestion.correctAnswer];
    
    const userAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
    
    // Сравниваем массивы
    if (correctAnswers.length !== userAnswers.length) return false;
    return JSON.stringify(correctAnswers.sort()) === JSON.stringify(userAnswers.sort());
  };

  const handleNextQuestion = () => {
    if (!showResult) {
      // Сохраняем ответ перед переходом
      if (selectedAnswer !== null && currentQuestion) {
        const answer: UserAnswer = {
          questionId: currentQuestion.id,
          selectedAnswer,
          isCorrect: checkAnswerCorrect(),
          timestamp: Date.now(),
        };
        addUserAnswer(answer);
      }

      // Показываем результат
      setShowResult(true);
    } else {
      // Переход к следующему вопросу
      setShowResult(false);
      setSelectedAnswer(null);
      nextQuestion();
    }
  };

  const handleFinish = () => {
    if (!showResult) {
      // Сохраняем последний ответ
      if (selectedAnswer !== null && currentQuestion) {
        const answer: UserAnswer = {
          questionId: currentQuestion.id,
          selectedAnswer,
          isCorrect: checkAnswerCorrect(),
          timestamp: Date.now(),
        };
        addUserAnswer(answer);
      }

      // Показываем результат для последнего вопроса
      setShowResult(true);
    } else {
      // Завершаем тест
      finishTest();
    }
  };

  const handleSkip = () => {
    if (currentQuestion) {
      // Сохраняем как неправильный ответ
      const answer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer: -1, // Специальное значение для пропущенного ответа
        isCorrect: false,
        timestamp: Date.now(),
      };
      addUserAnswer(answer);
    }
    
    // Переходим к следующему вопросу
    setShowResult(false);
    setSelectedAnswer(null);
    nextQuestion();
  };

  const handleStartAgain = () => {
    resetTest();
    setSelectedAnswer(null);
    setShowResult(false);
    localStorage.removeItem('testProgress');
  };

  // Обработка горячих клавиш
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Пропускаем если нажат input или textarea
      if ((e.target as HTMLElement).tagName === 'INPUT' || 
          (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        if (!showResult) {
          handleSkip();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const mainButton = document.getElementById('main-action-button') as HTMLButtonElement;
        if (mainButton && !mainButton.disabled) {
          mainButton.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showResult]);

  // Показываем результаты
  if (isTestFinished) {
    const stats = calculateStats(questions, userAnswers);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        <div className="max-w-6xl mx-auto">
          <TestResults stats={stats} onStartAgain={handleStartAgain} />
        </div>
      </div>
    );
  }

  // Показываем загрузку
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 dark:text-gray-200">Загрузка вопросов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pb-32">
      <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            React Тесты
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Проверьте свои знания React с нашей коллекцией вопросов
          </p>
        </header>

        {/* Выбор режима */}
        <TestModeSelector
          modes={testModes}
          selectedMode={selectedMode}
          onModeSelect={setSelectedMode}
        />

        {/* Фильтры */}
        <TestFilters
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          selectedTags={selectedTags}
          availableTags={availableTags}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onTagsChange={setSelectedTags}
        />

        {/* Карточка вопроса */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          showResult={showResult}
          disabled={showResult}
        />

        {/* Навигация */}
        <Navigation
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
          onNext={handleNextQuestion}
          onFinish={handleFinish}
          onSkip={handleSkip}
          showResult={showResult}
          disabled={selectedAnswer === null}
        />
      </div>
    </div>
  );
}

export default App;


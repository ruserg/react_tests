import { useEffect, useState } from 'react';
import { useTestStore } from './store/useTestStore';
import { QuestionCard } from './components/QuestionCard';
import { TestResults } from './components/TestResults';
import { TestFilters } from './components/TestFilters';
import { Navigation } from './components/Navigation';
import { TestModeSelector } from './components/TestModeSelector';
import { ThemeToggle } from './components/ThemeToggle';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { TestStartModal } from './components/TestStartModal';
import { NoQuestionsModal } from './components/NoQuestionsModal';
import allQuestions from './data/questions';
import { calculateStats } from './utils/stats';
import { filterQuestions, applyTestMode } from './utils/filter';
import { UserAnswer, testModes, TestMode } from './types/question';

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
    testStartTime,
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
    setTestStartTime,
  } = useTestStore();

  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showNoQuestionsModal, setShowNoQuestionsModal] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Загружаем вопросы при монтировании
  useEffect(() => {
    setQuestions(allQuestions);
    
    // Не восстанавливаем прогресс из localStorage автоматически,
    // пользователь должен начинать тест заново через выбор режима
  }, [setQuestions]);

  // Получаем уникальные теги из всех вопросов
  const availableTags = Array.from(
    new Set(allQuestions.flatMap((q) => q.tags))
  ).filter((tag) => !tag.startsWith('вариант-') && !tag.startsWith('вопрос-'));

  // Обработчик выбора режима - показываем модальное окно
  const handleModeSelect = (mode: TestMode | null) => {
    if (mode) {
      // Показываем модальное окно подтверждения
      setSelectedMode(mode);
      setShowStartModal(true);
    } else {
      setSelectedMode(null);
    }
  };
  
  // Обработчик подтверждения начала теста
  const handleStartTest = () => {
    if (selectedMode && allQuestions.length > 0) {
      const filtered = filterQuestions(allQuestions, selectedCategory, selectedDifficulty, selectedTags);
      const modeApplied = applyTestMode(filtered, selectedMode);
      
      // Проверяем что есть вопросы
      if (modeApplied.length === 0) {
        setShowStartModal(false);
        setShowNoQuestionsModal(true);
        setSelectedMode(null);
        return;
      }
      
      setQuestions(modeApplied);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setTestStartTime(Date.now()); // Запускаем таймер
      setShowStartModal(false);
    }
  };
  
  // Обработчик отмены начала теста
  const handleCancelStart = () => {
    setShowStartModal(false);
    setSelectedMode(null);
  };
  
  // Сброс при очистке режима
  useEffect(() => {
    if (!selectedMode && questions.length > 0 && userAnswers.length === 0) {
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setTestStartTime(null);
    }
  }, [selectedMode, questions.length, userAnswers.length, setQuestions, setCurrentQuestionIndex, setTestStartTime]);
  
  // Обновляем отображаемое время каждую секунду
  useEffect(() => {
    if (testStartTime === null) {
      setElapsedTime(0);
      return;
    }
    
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - testStartTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [testStartTime]);

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
        if (showShortcutsModal) {
          setShowShortcutsModal(false);
        } else if (!showResult) {
          handleSkip();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const mainButton = document.getElementById('main-action-button') as HTMLButtonElement;
        if (mainButton && !mainButton.disabled) {
          mainButton.click();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleDarkMode();
      } else if (e.key === '?') {
        e.preventDefault();
        setShowShortcutsModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showResult, showShortcutsModal, toggleDarkMode]);

  // Показываем результаты
  if (isTestFinished) {
    const stats = calculateStats(questions, userAnswers, testStartTime);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        <KeyboardShortcutsModal 
          isOpen={showShortcutsModal} 
          onClose={() => setShowShortcutsModal(false)} 
        />
        <div className="max-w-6xl mx-auto">
          <TestResults stats={stats} onStartAgain={handleStartAgain} />
        </div>
      </div>
    );
  }

  // Показываем модальное окно начала теста
  if (showStartModal && selectedMode) {
    const filtered = filterQuestions(allQuestions, selectedCategory, selectedDifficulty, selectedTags);
    const modeApplied = applyTestMode(filtered, selectedMode);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        <TestStartModal
          isOpen={showStartModal}
          mode={selectedMode}
          questionCount={modeApplied.length}
          onConfirm={handleStartTest}
          onCancel={handleCancelStart}
        />
      </div>
    );
  }

  // Показываем загрузку только если тест начат
  if (questions.length > 0 && !currentQuestion) {
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
      <KeyboardShortcutsModal 
        isOpen={showShortcutsModal} 
        onClose={() => setShowShortcutsModal(false)} 
      />
      <NoQuestionsModal
        isOpen={showNoQuestionsModal}
        onClose={() => setShowNoQuestionsModal(false)}
      />
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
          onModeSelect={handleModeSelect}
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
          elapsedTime={elapsedTime}
        />
      </div>
    </div>
  );
}

export default App;


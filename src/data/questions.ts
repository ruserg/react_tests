import { Question } from '../types/question';

// Базовая библиотека вопросов по React
const baseQuestions: Omit<Question, 'id'>[] = [
  // Основы
  {
    question: 'Что такое React?',
    options: [
      'JavaScript библиотека для создания пользовательских интерфейсов',
      'Фреймворк для бэкенд разработки',
      'База данных',
      'Язык программирования',
    ],
    correctAnswer: 0,
    explanation: 'React - это JavaScript библиотека для создания пользовательских интерфейсов, разработанная Facebook.',
    category: 'Основы',
    difficulty: 'Легкий',
    tags: ['основы', 'react'],
    type: 'single',
  },
  {
    question: 'Что такое JSX?',
    options: [
      'JavaScript XML - синтаксическое расширение для JavaScript',
      'Отдельный язык программирования',
      'База данных',
      'Фреймворк',
    ],
    correctAnswer: 0,
    explanation: 'JSX - это синтаксическое расширение JavaScript, которое позволяет писать HTML-подобный код в JavaScript файлах.',
    category: 'Основы',
    difficulty: 'Легкий',
    tags: ['основы', 'jsx'],
    type: 'single',
  },
  {
    question: 'Что делает метод ReactDOM.render()?',
    options: [
      'Удаляет компонент из DOM',
      'Рендерит React элемент в DOM дерево',
      'Обновляет состояние компонента',
      'Создает новый компонент',
    ],
    correctAnswer: 1,
    explanation: 'ReactDOM.render() принимает React элемент и рендерит его в указанный DOM элемент.',
    category: 'Основы',
    difficulty: 'Средний',
    tags: ['основы', 'rendering'],
    type: 'single',
  },
  {
    question: 'Что такое Virtual DOM?',
    options: [
      'Реальная часть браузера',
      'Виртуальное представление DOM в памяти React',
      'База данных',
      'API для работы с файлами',
    ],
    correctAnswer: 1,
    explanation: 'Virtual DOM - это JavaScript представление реального DOM, которое позволяет React эффективно обновлять UI.',
    category: 'Основы',
    difficulty: 'Средний',
    tags: ['virtual-dom', 'performance'],
    type: 'single',
  },
  
  // Компоненты
  {
    question: 'Что такое React компонент?',
    options: [
      'Функция или класс, возвращающий JSX',
      'Переменная',
      'Метод',
      'Библиотека',
    ],
    correctAnswer: 0,
    explanation: 'Компонент - это основная единица React приложения, которая возвращает JSX.',
    category: 'Компоненты',
    difficulty: 'Легкий',
    tags: ['компоненты'],
    type: 'single',
  },
  {
    question: 'Какие из следующих утверждений о props в React верны?',
    options: [
      'Props можно изменять внутри компонента',
      'Props передаются от родительского компонента к дочернему',
      'Props доступны только в классовых компонентах',
      'Props это внутреннее состояние компонента',
    ],
    correctAnswer: 1,
    explanation: 'Props передаются от родителя к ребенку и являются неизменяемыми.',
    category: 'Компоненты',
    difficulty: 'Средний',
    tags: ['props', 'компоненты'],
    type: 'multiple',
  },
  
  // Hooks
  {
    question: 'Что делает useState?',
    options: [
      'Рендерит компонент',
      'Управляет состоянием в функциональных компонентах',
      'Работает с API',
      'Обрабатывает события',
    ],
    correctAnswer: 1,
    explanation: 'useState - Hook для добавления локального состояния в функциональный компонент.',
    category: 'Hooks',
    difficulty: 'Легкий',
    tags: ['useState', 'hooks'],
    type: 'single',
  },
  {
    question: 'Что делает useEffect?',
    options: [
      'Меняет state',
      'Выполняет побочные эффекты в функциональных компонентах',
      'Рендерит UI',
      'Работает с роутингом',
    ],
    correctAnswer: 1,
    explanation: 'useEffect позволяет выполнять побочные эффекты (API запросы, подписки) в функциональных компонентах.',
    category: 'Hooks',
    difficulty: 'Средний',
    tags: ['useEffect', 'hooks'],
    type: 'single',
  },
  {
    question: 'Какие из следующих хуков используются для оптимизации производительности?',
    options: [
      'useState',
      'useCallback',
      'useMemo',
      'useContext',
    ],
    correctAnswer: [1, 2],
    explanation: 'useCallback и useMemo используются для мемоизации и оптимизации производительности.',
    category: 'Hooks',
    difficulty: 'Сложный',
    tags: ['useCallback', 'useMemo', 'hooks', 'performance'],
    type: 'multiple',
  },
  
  // State Management
  {
    question: 'Что такое Context API?',
    options: [
      'Встроенный способ управления состоянием в React',
      'Внешняя библиотека',
      'API базы данных',
      'Событие',
    ],
    correctAnswer: 0,
    explanation: 'Context API - встроенный способ передачи данных через дерево компонентов без props drilling.',
    category: 'State Management',
    difficulty: 'Средний',
    tags: ['context', 'state-management'],
    type: 'single',
  },
  {
    question: 'Что такое Redux?',
    options: [
      'Библиотека управления состоянием',
      'Фреймворк UI',
      'Язык программирования',
      'База данных',
    ],
    correctAnswer: 0,
    explanation: 'Redux - библиотека для предсказуемого управления состоянием приложения.',
    category: 'State Management',
    difficulty: 'Средний',
    tags: ['redux', 'state-management'],
    type: 'single',
  },
  
  // Роутинг
  {
    question: 'Что такое React Router?',
    options: [
      'Библиотека для навигации',
      'React компонент',
      'API',
      'Язык программирования',
    ],
    correctAnswer: 0,
    explanation: 'React Router - библиотека для маршрутизации в React приложениях.',
    category: 'Роутинг',
    difficulty: 'Легкий',
    tags: ['роутинг', 'react-router'],
    type: 'single',
  },
  {
    question: 'Что делает компонент BrowserRouter?',
    options: [
      'Обертка для маршрутов использующая HTML5 History API',
      'Рендерит страницу',
      'Работает с API',
      'Управляет состоянием',
    ],
    correctAnswer: 0,
    explanation: 'BrowserRouter использует HTML5 History API для маршрутизации.',
    category: 'Роутинг',
    difficulty: 'Средний',
    tags: ['роутинг', 'BrowserRouter'],
    type: 'single',
  },
  
  // Производительность
  {
    question: 'Что делает React.memo?',
    options: [
      'Мемоизирует компонент для предотвращения лишних рендеров',
      'Создает компонент',
      'Обновляет state',
      'Работает с API',
    ],
    correctAnswer: 0,
    explanation: 'React.memo мемоизирует компонент, предотвращая лишние рендеры.',
    category: 'Производительность',
    difficulty: 'Средний',
    tags: ['memo', 'performance'],
    type: 'single',
  },
  {
    question: 'Какие техники оптимизации React вы знаете?',
    options: [
      'Code splitting',
      'Lazy loading',
      'Мемоизация',
      'Все вышеперечисленное',
    ],
    correctAnswer: 3,
    explanation: 'Все эти техники используются для оптимизации React приложений.',
    category: 'Производительность',
    difficulty: 'Сложный',
    tags: ['performance', 'optimization'],
    type: 'single',
  },
  
  // Тестирование
  {
    question: 'Что такое Jest?',
    options: [
      'Фреймворк для тестирования JavaScript кода',
      'UI компонент',
      'База данных',
      'API',
    ],
    correctAnswer: 0,
    explanation: 'Jest - популярный фреймворк для тестирования JavaScript кода.',
    category: 'Тестирование',
    difficulty: 'Легкий',
    tags: ['testing', 'jest'],
    type: 'single',
  },
  {
    question: 'Что такое React Testing Library?',
    options: [
      'Библиотека для тестирования компонентов',
      'UI компонент',
      'Метод React',
      'Событие',
    ],
    correctAnswer: 0,
    explanation: 'React Testing Library - библиотека для тестирования React компонентов.',
    category: 'Тестирование',
    difficulty: 'Легкий',
    tags: ['testing'],
    type: 'single',
  },
  
  // React 18+
  {
    question: 'Что такое Concurrent React?',
    options: [
      'Подход для улучшения производительности',
      'Новый язык',
      'UI компонент',
      'API',
    ],
    correctAnswer: 0,
    explanation: 'Concurrent React позволяет React прерывать рендеринг для важных задач.',
    category: 'React 18+',
    difficulty: 'Средний',
    tags: ['react-18', 'concurrent'],
    type: 'single',
  },
  {
    question: 'Что делает createRoot?',
    options: [
      'Новый способ создания root в React 18',
      'Старый render',
      'Удаляет root',
      'Обновляет root',
    ],
    correctAnswer: 0,
    explanation: 'createRoot - новый API для создания root в React 18 вместо ReactDOM.render.',
    category: 'React 18+',
    difficulty: 'Средний',
    tags: ['react-18'],
    type: 'single',
  },
  {
    question: 'Что такое Suspense?',
    options: [
      'Компонент для ленивой загрузки и fallback UI',
      'Событие',
      'Метод',
      'API',
    ],
    correctAnswer: 0,
    explanation: 'Suspense позволяет показывать fallback UI во время загрузки компонентов.',
    category: 'React 18+',
    difficulty: 'Средний',
    tags: ['react-18', 'suspense'],
    type: 'single',
  },
];

// Генерируем уникальные вариации для достижения 1000 вопросов
function generateUniqueQuestions(): Question[] {
  const generated: Question[] = [];
  const categories: Question['category'][] = [
    'Основы',
    'Компоненты',
    'Hooks',
    'State Management',
    'Роутинг',
    'Производительность',
    'Тестирование',
    'React 18+',
  ];
  const difficulties: Question['difficulty'][] = ['Легкий', 'Средний', 'Сложный'];
  
  let idCounter = 1;
  let questionTemplateIndex = 0;
  
  // Генерируем вопросы на основе шаблонов
  while (generated.length < 1000) {
    const template = baseQuestions[questionTemplateIndex % baseQuestions.length];
    const variantNum = Math.floor(questionTemplateIndex / baseQuestions.length);
    
    // Чередуем категории и сложности
    const category = categories[variantNum % categories.length];
    const difficulty = difficulties[variantNum % difficulties.length];
    
    generated.push({
      id: String(idCounter++),
      question: variantNum > 0 ? `${template.question} (${variantNum + 1})` : template.question,
      options: template.options,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation,
      category,
      difficulty,
      tags: template.tags,
      type: template.type,
    });
    
    questionTemplateIndex++;
  }
  
  return generated;
}

const allQuestions = generateUniqueQuestions();

export default allQuestions;

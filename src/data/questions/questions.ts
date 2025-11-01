import { Question } from '../../types/question';
import { basicsQuestions } from './basics';
import { componentsQuestions } from './components';
import { hooksQuestions } from './hooks';
import { stateManagementQuestions } from './state-management';
import { routingQuestions } from './routing';
import { performanceQuestions } from './performance';
import { testingQuestions } from './testing';
import { react18Questions } from './react18';

const allQuestions: Question[] = [
  ...basicsQuestions,
  ...componentsQuestions,
  ...hooksQuestions,
  ...stateManagementQuestions,
  ...routingQuestions,
  ...performanceQuestions,
  ...testingQuestions,
  ...react18Questions,
].map((q, index) => ({
  id: String(index + 1),
  ...q
}));

export default allQuestions;


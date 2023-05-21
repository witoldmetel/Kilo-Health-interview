import { fork } from 'typed-redux-saga';

import { quizSagas } from './app/QuizSaga';

export function* rootSaga() {
  yield* fork(quizSagas);
}

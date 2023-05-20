import { fork } from 'typed-redux-saga';

import { questionsSagas } from './app/QuestionsSaga';

export function* rootSaga() {
  yield* fork(questionsSagas);
}

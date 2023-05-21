import { call, put, takeLatest } from 'typed-redux-saga';
import axios, { AxiosResponse } from 'axios';
import { Question } from '@typings/questions';

import { setActiveQuestion, setQuestions } from './QuizSlice';

// Action types
const FETCH_QUESTIONS_REQUEST = 'questions/fetchQuestionsRequest';
const FETCH_QUESTIONS_SUCCESS = 'questions/fetchQuestionsSuccess';
const FETCH_QUESTIONS_FAILURE = 'questions/fetchQuestionsFailure';

// Action creators
export const fetchQuestionsRequest = () => ({
  type: FETCH_QUESTIONS_REQUEST,
});

export const fetchQuestionsSuccess = (questions: Question[]) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: questions,
});

export const fetchQuestionsFailure = (error: unknown) => ({
  type: FETCH_QUESTIONS_FAILURE,
  payload: error,
});

// Type guards
function isAxiosResponse(response: unknown): response is AxiosResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    'status' in response
  );
}

function isQuestionsResponse(
  data: unknown,
): data is { record: { questions: Question[] } } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'record' in data &&
    Array.isArray(
      (data as { record: { questions: Question[] } }).record.questions,
    )
  );
}

async function fetchQuestions() {
  return axios.get('https://api.jsonbin.io/v3/b/62cd20b4ecfa6c12a01fa4ed');
}

function* fetchQuestionsSaga() {
  try {
    const response = yield* call(fetchQuestions);

    if (isAxiosResponse(response) && isQuestionsResponse(response.data)) {
      yield* put(setQuestions(response.data.record.questions));
      yield* put(
        setActiveQuestion({
          index: 0,
          question: response.data.record.questions[0],
        }),
      );
    }
  } catch (error: unknown) {
    yield* put(fetchQuestionsFailure(error)); // Dispatch FETCH_QUESTIONS_FAILURE action
  }
}

export function* quizSagas() {
  yield* takeLatest(FETCH_QUESTIONS_REQUEST, fetchQuestionsSaga);
}

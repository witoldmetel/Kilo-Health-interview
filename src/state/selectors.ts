import { QuizReducerState } from './app/QuizSlice';

export const selectQuestions = ({
  quizReducer,
}: {
  quizReducer: QuizReducerState;
}) => quizReducer.questions;

export const selectIsLoading = ({
  quizReducer,
}: {
  quizReducer: QuizReducerState;
}) => quizReducer.isLoading;

export const selectError = ({
  quizReducer,
}: {
  quizReducer: QuizReducerState;
}) => quizReducer.error;

export const selectActiveQuestionIndex = ({
  quizReducer,
}: {
  quizReducer: QuizReducerState;
}) => quizReducer.activeQuestionIndex;

export const selectActiveQuestion = ({
  quizReducer,
}: {
  quizReducer: QuizReducerState;
}) => quizReducer.activeQuestion;

export const selectAnswers = ({
  quizReducer,
}: {
  quizReducer: QuizReducerState;
}) => quizReducer.selectedAnswers;

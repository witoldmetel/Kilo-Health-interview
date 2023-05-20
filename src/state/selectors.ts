import { QuestionsReducerState } from './app/QuestionsSlice';

export const selectQuestions = ({
  questionsReducer,
}: {
  questionsReducer: QuestionsReducerState;
}) => questionsReducer.questions;
export const selectIsLoading = ({
  questionsReducer,
}: {
  questionsReducer: QuestionsReducerState;
}) => questionsReducer.isLoading;
export const selectError = ({
  questionsReducer,
}: {
  questionsReducer: QuestionsReducerState;
}) => questionsReducer.error;
export const selectActiveQuestionIndex = ({
  questionsReducer,
}: {
  questionsReducer: QuestionsReducerState;
}) => questionsReducer.activeQuestionIndex;
export const selectActiveQuestion = ({
  questionsReducer,
}: {
  questionsReducer: QuestionsReducerState;
}) => questionsReducer.activeQuestion;

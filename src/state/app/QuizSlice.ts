import { createSlice } from '@reduxjs/toolkit';
import { Question } from '@typings/questions';

export interface QuizReducerState {
  questions: Question[];
  isLoading: boolean;
  error: unknown;
  activeQuestionIndex: number;
  activeQuestion: Question | null;
}

export const INITIAL_STATE: QuizReducerState = {
  questions: [],
  isLoading: false,
  error: null,
  activeQuestionIndex: 0,
  activeQuestion: null,
};

export const QuizSlice = createSlice({
  name: 'questions',
  initialState: INITIAL_STATE,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.isLoading = false;
    },
    setActiveQuestion: (state, action) => {
      state.activeQuestionIndex = action.payload.index;
      state.activeQuestion = action.payload.question;
    },
    clearState: () => INITIAL_STATE,
  },
});

export const { setQuestions, setActiveQuestion, clearState } =
  QuizSlice.actions;

export default QuizSlice.reducer;

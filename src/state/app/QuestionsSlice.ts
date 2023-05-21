import { createSlice } from '@reduxjs/toolkit';
import { Question } from '@typings/questions';

export interface QuestionsReducerState {
  questions: Question[];
  isLoading: boolean;
  error: unknown;
  activeQuestionIndex: number;
  activeQuestion: Question | null;
}

export const INITIAL_STATE: QuestionsReducerState = {
  questions: [],
  isLoading: false,
  error: null,
  activeQuestionIndex: 0,
  activeQuestion: null,
};

export const QuestionsSlice = createSlice({
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
  QuestionsSlice.actions;

export default QuestionsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: [],
};

export const AnswersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    clearAnswers: state => {
      state.answers = [];
    },
  },
});

export const { addAnswer, clearAnswers } = AnswersSlice.actions;

export default AnswersSlice.reducer;

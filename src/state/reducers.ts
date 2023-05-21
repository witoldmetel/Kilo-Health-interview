import { AnyAction, CombinedState, combineReducers } from 'redux';

import { QuizReducerState, QuizSlice } from './app/QuizSlice';

export interface RootState {
  quizReducer: QuizReducerState;
}

export interface PersistedAppState extends RootState {
  _persist: { version: number; rehydrated: boolean };
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  quizReducer: QuizSlice.reducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);

export { rootReducer };

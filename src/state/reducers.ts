import { AnyAction, CombinedState, combineReducers } from 'redux';

import { QuestionsReducerState, QuestionsSlice } from './app/QuestionsSlice';

export interface RootState {
  questionsReducer: QuestionsReducerState;
}

export interface PersistedAppState extends RootState {
  _persist: { version: number; rehydrated: boolean };
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  questionsReducer: QuestionsSlice.reducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);

export { rootReducer };

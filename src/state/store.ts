/* eslint-disable import/no-extraneous-dependencies */
import * as Sentry from '@sentry/react-native';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { compact } from 'lodash';
import { persistReducer, persistStore } from 'redux-persist';
import { Reactotron } from 'reactotron-core-client';
import { ReactotronReactNative } from 'reactotron-react-native';
import { initReactotron } from '@utils/reactotron';

import FeatureEnabler from '../featureEnabler';
import { PersistedAppState, rootReducer, RootState } from './reducers';
import { rootSaga } from './sagas';
import { storage } from '../utils/storage';

const persistorConfig = {
  key: '@GreatnessApp:state',
  storage,
  whitelist: ['questions'],
};

declare global {
  interface Console {
    tron:
      | (Reactotron<ReactotronReactNative> & ReactotronReactNative)
      | { log: () => void };
  }
}

export const configStore = (initialState?: PersistedAppState) => {
  let sagaMonitor;
  let reactorEnhancer;

  if (FeatureEnabler.reactotron) {
    const ReactotronInstance = initReactotron();

    sagaMonitor = ReactotronInstance.createSagaMonitor?.();
    reactorEnhancer = ReactotronInstance.createEnhancer?.();
    console.tron = ReactotronInstance;
  } else {
    console.tron = { log: () => null };
  }

  let sentryReduxEnhancer;

  if (FeatureEnabler.sentry) {
    sentryReduxEnhancer = Sentry.createReduxEnhancer({
      // Optionally pass options listed below
      // State logging
      stateTransformer: (state: RootState) => ({
        questions: state.questionsReducer,
      }),
      // Actions logging
      //  actionTransformer: action => {
      //    if (action.type === "GOVERNMENT_SECRETS") {
      //      // Return null to not log the action to Sentry
      //      return null;
      //    } else {
      //      return action;
      //    }
      //  },
      // set tags derived from state
      // configureScopeWithState: (scope, state: RootState) => {
      //   const { userInfo } = state.user;

      //   const unitSystem = userInfo?.unit_system;

      //   if (unitSystem) {
      //     scope.setTag('user.unitSystem', unitSystem);
      //   }

      //   const userEmail = userInfo?.email;

      //   if (userEmail) {
      //     scope.setTag('user.email', userEmail);
      //   }

      //   scope.setTag('user.status', state.user.userInfo?.status);
      // },
    });
  }

  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const middlewares = [];

  middlewares.push(sagaMiddleware);
  const appliedMiddleware = applyMiddleware(sagaMiddleware);

  const enhancers = compose(
    ...compact([appliedMiddleware, reactorEnhancer, sentryReduxEnhancer]),
  );
  const persistedReducer = persistReducer(persistorConfig, rootReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = createStore(persistedReducer, initialState, enhancers as any);
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};

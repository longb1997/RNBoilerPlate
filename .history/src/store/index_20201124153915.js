import {compose, createStore, applyMiddleware} from 'redux';
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import {createLogger} from 'redux-logger';

import rootSaga from './saga';
import rootReducers from './reducer'; // where reducers is a object of reducers

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'],
  debug: true,
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

const persistedReducer = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];

const persistConfig = {enhancers};

export default function configureStore() {
  const store = createStore(persistedReducer, undefined, compose(...enhancers));
  const persistor = persistStore(store, persistConfig);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}

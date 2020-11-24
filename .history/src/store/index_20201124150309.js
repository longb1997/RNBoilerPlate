import {combineReducers, createStore, applyMiddleware} from 'redux';
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

import rootSaga from './saga';
import rootReducers from './reducer'; // where reducers is a object of reducers

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'],
  debug: true, //to get useful logging
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = {enhancers};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

export default function configureStore() {
  const store = createStore(persistedReducer, undefined, compose(...enhancers));
  const persistor = persistStore(store, persistConfig);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}

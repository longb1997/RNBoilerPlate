import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'],
  debug: true, //to get useful logging
};

const rootReducer = combineReducers({reducerUser});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];

export default function configureStore() {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}

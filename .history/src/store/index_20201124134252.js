import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import rootReducers from './reducers'; // where reducers is a object of reducers

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

// if (__DEV__) {
//   middleware.push(createLogger());
// }

export default function configureStore() {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}

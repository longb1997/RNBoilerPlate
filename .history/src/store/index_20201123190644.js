import {combineReducers, createStore, applyMiddleware} from 'redux';
import reducer from './allReducers';
import createSagaMiddleware from 'redux-saga';
import saga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

let store = createStore(reducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);

sagaMiddleware.run(saga);
export {store, persistor};

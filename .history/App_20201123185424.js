import React from 'react';
import AppContainer from './routes';
import {Provider} from 'react-redux';
import configureStore from './store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}

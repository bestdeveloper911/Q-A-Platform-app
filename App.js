import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import MainApp from './src/MainApp';
import { PersistGate } from 'redux-persist/lib/integration/react';

const App = () => {
  console.disableYellowBox = true
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp/> 
      </PersistGate>
    </Provider>
  )
}

export default App

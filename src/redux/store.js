import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Thunk from 'redux-thunk';
import Logger from 'redux-logger';
import rootReducers from './reducers';

const middleware = [Thunk, Logger];
middleware.push(Logger);
const persistConfig = {
 key: 'root',
 storage: AsyncStorage
};

const pReducer = persistReducer(persistConfig, rootReducers);
export const store = createStore(pReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
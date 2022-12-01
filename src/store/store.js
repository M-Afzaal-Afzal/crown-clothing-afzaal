import { compose, applyMiddleware, createStore } from 'redux';
import logger from "redux-logger";
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// root-reducer - combination of all reducers
import { rootReducer } from './root-reducer';

const middleWares = [logger, thunk]

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, {},
  composedEnhancers)

export const persistor = persistStore(store)

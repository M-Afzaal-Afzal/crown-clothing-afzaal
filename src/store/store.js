import { compose, applyMiddleware, createStore } from 'redux';
import logger from "redux-logger";
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

// root-reducer - combination of all reducers
import { rootReducer } from './root-reducer';

const sagaMiddleWare = createSagaMiddleware();

const middleWares = [logger, thunk, sagaMiddleWare]

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, {},
  composedEnhancers)

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store)

import { compose, applyMiddleware, createStore, Middleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

// root-reducer - combination of all reducers
import { rootReducer } from "./root-reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleWare = createSagaMiddleware();

const middleWares = [process.env.NODE_ENV !== "production" && logger, thunk, sagaMiddleWare].filter(
  (middleware): middleware is Middleware => Boolean(middleware)
);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);

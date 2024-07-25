import { configureStore, Action } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { Action as AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';
import { persistReducer, persistStore } from 'redux-persist';
import createIdbStorage from '@piotr-cz/redux-persist-idb-storage';
import { PERSIST, PURGE } from 'redux-persist/es/constants';

import createRootReducer from './rootReducers';

export const history = createBrowserHistory();
const rootReducer = createRootReducer();
export type RootState = ReturnType<typeof rootReducer>;

const excludeLoggerEnvs = ['prod'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(
  import.meta.env.VITE_RUN_MODE || '',
);

let logger: any = undefined;

if (shouldIncludeLogger) {
  logger = createLogger({
    level: 'info',
    collapsed: true,
  });
}

export const configuredStore = () => {
  // Create Store
  const persistConfig = {
    key: 'root',
    storage: createIdbStorage({ name: 'pccse', storeName: 'keyval' }),
    serialize: false, // Data serialization is not required and disabling it allows you to inspect storage value in DevTools; Available since redux-persist@5.4.0
    deserialize: false, // Required to bear same value as `serialize` since redux-persist@6.0
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer as any);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware): any => {
      const middleware = [
        ...getDefaultMiddleware({ serializableCheck: false }),
        routerMiddleware(history),
        createStateSyncMiddleware({
          blacklist: [PERSIST, PURGE],
        }),
      ];
      if (logger) return [...middleware, logger];
      return middleware;
    },
  });
  return store;
};

export const store = configuredStore();
initMessageListener(store);
export const persistor = persistStore(store);
export type Store = ReturnType<typeof configuredStore>;
export type ReduxState = ReturnType<typeof createRootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

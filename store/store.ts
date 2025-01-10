import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateReducer from './dateSlice';
import settingsReducer from './settingsSlice';
import userReducer from './userSlice';

import benchmarkMiddleware from '../middleware/benchmarkMiddleware';

const migrations = {
  0: (state) => {
    // migration clear out device state
    return {
      ...state,
      device: undefined
    };
  },
  1: (state) => {
    // migration to keep only device state
    return {
      device: state.device
    };
  }
};

const persistConfig = {
  key: 'root',
  verions: 1,
  storage: AsyncStorage,
  migrate: createMigrate(migrations, { debug: __DEV__ })
};

const rootReducer = combineReducers({
  date: dateReducer,
  settings: settingsReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(benchmarkMiddleware)
});

export const persistor = persistStore(store);

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    persistor.purge();
    console.warn('Storage cleared!');
  } catch (e) {
    console.error('Error clearing storage:', e);
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

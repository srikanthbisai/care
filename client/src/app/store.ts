import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from '../features/authSlice';
import statsReducer from '../features/statsSlice'; 

const persistConfig = {
  key: 'auth', 
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer), 
  stats: statsReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

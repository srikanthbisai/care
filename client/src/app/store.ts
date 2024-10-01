import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default localStorage for web
import authReducer from '../features/authSlice'; // Adjust path as necessary
import statsReducer from '../features/statsSlice'; // Adjust path as necessary

// Configuration for redux-persist (for auth)
const persistConfig = {
  key: 'auth', // Only persist the auth slice
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer), // Persist the auth reducer
  stats: statsReducer, // Non-persisted reducer
});

// Configure the store with middleware to ignore non-serializable values
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions from redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create a persistor for the store
export const persistor = persistStore(store);

// Define RootState and AppDispatch types for usage in your application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

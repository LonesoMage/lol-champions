import { configureStore } from '@reduxjs/toolkit';
import championSlice from './slices/championSlice';

export const store = configureStore({
  reducer: {
    champions: championSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
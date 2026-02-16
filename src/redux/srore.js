
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { eventSlice } from './features/eventSlice/eventSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedEvent: eventSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './invoicesSlice';

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
  },
});

export default store;

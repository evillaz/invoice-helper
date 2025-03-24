import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './invoiceSlice';

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});

export default store;

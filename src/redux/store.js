import { configureStore } from '@reduxjs/toolkit';
import xmlInvoiceReducer from './xmlInvoicesSlice';
import databaseInvoiceReducer from './databaseInvoiceSlice';

const store = configureStore({
  reducer: {
    xmlInvoices: xmlInvoiceReducer,
    databaseInvoices: databaseInvoiceReducer,
  },
});

export default store;

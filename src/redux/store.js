import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './invoicesSlice';
import motorcyclesReducer from './motorcyclesSlice';

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    motorcycles: motorcyclesReducer,
  },
});

export default store;

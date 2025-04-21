import { configureStore } from '@reduxjs/toolkit';
import motorcyclesReducer from './motorcyclesSlice';
import customersReducer from './customersSlice';
import salesReducer from './salesSlice';

const store = configureStore({
  reducer: {
    motorcycles: motorcyclesReducer,
    customers: customersReducer,
    sales: salesReducer,
  },
});

export default store;

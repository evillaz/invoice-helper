import { configureStore } from '@reduxjs/toolkit';
import motorcyclesReducer from './motorcyclesSlice';
import customersReducer from './customersSlice';

const store = configureStore({
  reducer: {
    motorcycles: motorcyclesReducer,
    customers: customersReducer,
  },
});

export default store;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/customers');
      if (!response.ok) throw new Error('Error fetching motorcycles from DB');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const saveCustomerToDB = createAsyncThunk(
  'customers/saveCustomerToDB',
  async (customer, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error('Failed to save customer');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  customers: [],
  status: 'idle',
  error: null,
  message: '',
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveCustomerToDB.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveCustomerToDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.customers = [...state.customers, action.payload];
      })
      .addCase(saveCustomerToDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = customersSlice.actions;
export default customersSlice.reducer;

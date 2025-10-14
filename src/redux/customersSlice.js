import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://192.168.15.19:3000';

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/customers`);
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
      console.log(customer);
      const response = await fetch(`${API_BASE_URL}/api/v1/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer }),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Validation errors:', errorData);
        throw new Error(errorData.errors?.join(', ') || 'Failed to save customer');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
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

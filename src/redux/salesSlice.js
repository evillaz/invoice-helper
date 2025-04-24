import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/sales');
      if (!response.ok) throw new Error('Error fetching sales from DB');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const saveSaleToDB = createAsyncThunk(
  'sales/saveSaleToDB',
  async (sale, { rejectWithValue }) => {
    console.log(sale);
    try {
      const response = await fetch('http://localhost:3000/api/v1/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          factura: sale.factura,
          dni: sale.customer.dni,
          total_amount: sale.total_amount,
        }),
      });
      if (!response.ok) throw new Error('Failed to save sales');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteSaleFromDB = createAsyncThunk(
  'sales/deleteSalesFromDB',
  async (saleId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/sales/${saleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting sale from DB');
      return saleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  sales: [],
  status: 'idle',
  error: null,
  message: '',
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sales = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveSaleToDB.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveSaleToDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.sales = [...state.sales, action.payload];
      })
      .addCase(saveSaleToDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = action.payload;
      })
      .addCase(deleteSaleFromDB.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSaleFromDB.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.sales = state.sales.filter(
          (sale) => sale.id !== action.payload,
        );
      })
      .addCase(deleteSaleFromDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = salesSlice.actions;
export default salesSlice.reducer;

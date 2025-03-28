import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchInvoices = createAsyncThunk(
  'databaseInvoices/fetchInvoicesFromDB',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/motorcycles');
      if (!response.ok) throw new Error('Error fetching invoices from DB');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const saveInvoicesToDB = createAsyncThunk(
  'databaseInvoices/saveInvoicesToDB',
  async (_, { getState, rejectWithValue }) => {
    try {
      const existingInvoices = getState().databaseInvoices.invoices;
      const { xmlInvoices } = getState().xmlInvoices;

      // Filter out duplicates
      const newInvoices = xmlInvoices.filter(
        (newInvoice) => !existingInvoices.some(
          (existingInvoice) => existingInvoice.factura === newInvoice.factura,
        ),
      );

      if (newInvoices.length === 0) {
        console.log('No new invoices to save.');
        return { message: 'No new invoices to save', savedInvoices: [] };
      }
      console.log(newInvoices);
      // Save only the new invoices
      const responses = await Promise.all(
        newInvoices.map(async (invoice) => {
          const response = await fetch('http://localhost:3000/api/v1/motorcycles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invoice),
          });
          if (!response.ok) throw new Error('Error saving an invoice');
          return response.json();
        }),
      );
      return { message: 'Invoices saved successfully', savedInvoices: responses };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  invoices: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const databaseInvoiceSlice = createSlice({
  name: 'databaseInvoices',
  initialState,
  reducers: {
    clearInvoices: (state) => {
      state.invoices = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveInvoicesToDB.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveInvoicesToDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = [...state.invoices, ...action.payload.savedInvoices];
      })
      .addCase(saveInvoicesToDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearInvoices } = databaseInvoiceSlice.actions;
export default databaseInvoiceSlice.reducer;

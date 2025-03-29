import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch invoices from DB
export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/motorcycles');
      if (!response.ok) throw new Error('Error fetching invoices from DB');
      const data = await response.json();

      const parsedInvoices = data.map((invoice) => ({
        factura: invoice.factura,
        modelo: invoice.modelo,
        marca: invoice.marca,
        color: invoice.color,
        numero_de_chasis: invoice.numero_de_chasis,
        numero_de_motor: invoice.numero_de_motor,
        dua: invoice.dua,
        anio: invoice.anio,
      }));

      return parsedInvoices;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Save new invoices to DB
export const saveInvoicesToDB = createAsyncThunk(
  'invoices/saveInvoicesToDB',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { invoices } = getState().invoices;
      const newInvoices = invoices.filter((inv) => !inv.savedToDB);

      if (newInvoices.length === 0) return { message: 'No new invoices to save', savedInvoices: [] };

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

export const deleteInvoiceFromDB = createAsyncThunk(
  'invoices/deleteInvoiceFromDB',
  async (facturaId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/motorcycles/${facturaId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting invoice from DB');
      return facturaId; // Return the deleted invoice ID to remove it from Redux state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  invoices: [], // Unified list from DB + Uploaded
  selectedInvoices: [],
  status: 'idle',
  error: null,
  message: '',
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addXMLInvoices: (state, action) => {
      const newInvoices = action.payload.filter(
        (newInvoice) => !state.invoices.some(
          (existingInvoice) => existingInvoice.factura === newInvoice.factura,
        ),
      );
      state.invoices = [...state.invoices, ...newInvoices.map(
        (inv) => ({ ...inv, savedToDB: false }),
      )];
    },
    removeInvoice: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice.factura !== action.payload);
      state.selectedInvoices = state.selectedInvoices.filter(
        (invoice) => invoice.factura !== action.payload,
      );
    },
    toggleSelectInvoice: (state, action) => {
      const invoiceId = action.payload;
      const exists = state.selectedInvoices.some((inv) => inv.factura === invoiceId);
      state.selectedInvoices = exists
        ? state.selectedInvoices.filter((inv) => inv.factura !== invoiceId)
        : [...state.selectedInvoices, state.invoices.find((inv) => inv.factura === invoiceId)];
    },
    clearInvoices: (state) => {
      state.invoices = [];
      state.selectedInvoices = [];
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = action.payload.map((inv) => ({ ...inv, savedToDB: true }));
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
        state.invoices = state.invoices.map(
          (inv) => (action.payload.savedInvoices.some((saved) => saved.factura === inv.factura)
            ? { ...inv, savedToDB: true }
            : inv),
        );
        state.message = action.payload.message;
      })
      .addCase(saveInvoicesToDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = action.payload;
      })
      .addCase(deleteInvoiceFromDB.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteInvoiceFromDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = state.invoices.filter(
          (invoice) => invoice.factura !== action.payload,
        );
        state.selectedInvoices = state.selectedInvoices.filter(
          (invoice) => invoice.factura !== action.payload,
        );
      })
      .addCase(deleteInvoiceFromDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  addXMLInvoices, removeInvoice, toggleSelectInvoice, clearInvoices, clearMessage,
} = invoicesSlice.actions;
export default invoicesSlice.reducer;

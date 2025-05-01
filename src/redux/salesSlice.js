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
  async (sale, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/sales/${sale.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting sale from DB');
      return sale;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateBoleta = createAsyncThunk(
  'sales/updateBoleta',
  async (sale, { rejectWithValue }) => {
    const { saleId, boleta } = sale;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/sales/${saleId}/update_boleta`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boleta,
        }),
      });
      if (!response.ok) throw new Error('Error updating sale');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* export const updateBoleta = createAsyncThunk(
  'sales/updateBoleta',
  async (saleId, { rejectWithValue }) => {
    try{
      const response = await fetch(`http://localhost:3000/api/v1/sales/${saleId}`,{
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Error updating sale');
      return saleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
); */

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
    updateBoletaValue: (state, action) => {
      const { saleId, boleta } = action.payload;
      const sale = state.sales.find((s) => s.id === saleId);
      if (sale) {
        sale.boleta = boleta;
      }
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
        state.status = 'succeeded';
        state.sales = state.sales.filter(
          (sale) => sale.id !== action.payload.id,
        );
      })
      .addCase(deleteSaleFromDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateBoleta.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBoleta.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, boleta } = action.payload;
        state.sales = state.sales.map(
          (sale) => (sale.id === id
            ? { ...sale, boleta } : sale),
        );
      })
      .addCase(updateBoleta.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMessage, updateBoletaValue } = salesSlice.actions;
export default salesSlice.reducer;

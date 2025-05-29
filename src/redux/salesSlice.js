import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import formatDate from '../utils/format/formatDate';

const SALE_STATUSES = {
  PROSPECT: 'prospect',
  PROCESSED: 'processed',
  TITULO_REGISTERED: 'titulo_registered',
  PLACA_REGISTERED: 'placa_registered',
};

const determineSaleStatus = (sale) => {
  if (!sale.electronic_receipt) {
    return SALE_STATUSES.PROSPECT;
  }

  if (sale.electronic_receipt && !sale.title) {
    return SALE_STATUSES.PROCESSED;
  }

  if (sale.title && !sale.plate) {
    return SALE_STATUSES.TITULO_REGISTERED;
  }

  if (sale.plate) {
    return SALE_STATUSES.PLACA_REGISTERED;
  }

  return SALE_STATUSES.PROCESSED;
};

const transformSaleDate = (sale) => {
  const dateSource = sale.electronic_receipt?.issue_date || sale.created_at;
  return formatDate(new Date(dateSource));
};

const getSalesDate = (data) => data.map((d) => ({
  ...d,
  sale_date: transformSaleDate(d),
}));

export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/sales');
      if (!response.ok) throw new Error('Error fetching sales from DB');
      const data = await response.json();
      const salesData = getSalesDate(data);
      return salesData.map((sale) => ({
        ...sale,
        issueDate: sale.electronic_receipt.issue_date,
      }));
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

export const updateElectronicReceipt = createAsyncThunk(
  'sales/updateElectronicReceipt',
  async (sale, { rejectWithValue }) => {
    const { saleId, electronic_receipt } = sale;
    try {
      const response = await fetch(`http://localhost:3000/api/v1/sales/${saleId}/update_receipt`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          electronic_receipt,
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

export const addPayment = createAsyncThunk(
  'sales/addPayment',
  async (paymentStructure, { rejectWithValue }) => {
    const { saleId, payment } = paymentStructure;
    try {
      const response = await fetch(`http://localhost:3000/api/v1/sales/${saleId}/add_payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment,
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

export const deletePayment = createAsyncThunk(
  'sales/deletePayment',
  async (paymentStructure, { rejectWithValue }) => {
    console.log(paymentStructure);
    const { saleId, paymentId } = paymentStructure;
    try {
      const response = await fetch(`http://localhost:3000/api/v1/sales/${saleId}/remove_payment/${paymentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting sale from DB');
      return paymentStructure;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const selectSaleById = (state, saleId) => state.sales.sales?.find(
  (sale) => sale.id === Number(saleId),
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
        state.sales = action.payload.map((sale) => ({
          ...sale,
          status: determineSaleStatus(sale),
        }));
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
        const saleWithStatus = {
          ...action.payload,
          sale_date: transformSaleDate(action.payload),
          status: determineSaleStatus(action.payload),
        };
        state.sales = [...state.sales, saleWithStatus];
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
            ? { ...sale, boleta, status: determineSaleStatus(sale) } : sale),
        );
      })
      .addCase(updateBoleta.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateElectronicReceipt.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateElectronicReceipt.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload.sale;
        const electronic_receipt = {
          receipt_number: action.payload.receipt_number,
          issue_date: action.payload.issue_date,
        };
        state.sales = state.sales.map(
          (sale) => (sale.id === id
            ? {
              ...sale,
              electronic_receipt,
              sale_date: transformSaleDate(sale),
              status: determineSaleStatus(sale),
            } : sale),
        );
      })
      .addCase(updateElectronicReceipt.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload.sale;
        const { amount, issue_date, transaction_number } = action.payload;
        const payment = {
          amount,
          issue_date,
          transaction_number,
        };
        state.sales = state.sales.map(
          (sale) => (sale.id === id
            ? {
              ...sale,
              payments: [...(sale.payments || []), payment],
              status: determineSaleStatus(sale),
            } : sale),
        );
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deletePayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMessage, updateBoletaValue } = salesSlice.actions;
export default salesSlice.reducer;

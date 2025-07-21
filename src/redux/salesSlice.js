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
    return {
      ...sale,
      status: SALE_STATUSES.PROSPECT,
    };
  }

  if (sale.electronic_receipt && !sale.title) {
    return {
      ...sale,
      status: SALE_STATUSES.PROCESSED,
    };
  }

  if (sale.title && !sale.plate) {
    return {
      ...sale,
      status: SALE_STATUSES.TITULO_REGISTERED,
    };
  }

  if (sale.plate) {
    return {
      ...sale,
      status: SALE_STATUSES.PLACA_REGISTERED,
    };
  }

  return {
    ...sale,
    status: SALE_STATUSES.PROCESSED,
  };
};

const transformSaleDate = (sale) => {
  const dateSource = sale.electronic_receipt?.issue_date || sale.created_at;
  return {
    ...sale,
    sale_date: formatDate(new Date(dateSource)),
  };
};

const getSalesDate = (data) => data.map((d) => (
  transformSaleDate(d)
));

export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/sales');
      if (!response.ok) throw new Error('Error fetching sales from DB');
      const data = await response.json();
      const salesData = getSalesDate(data);
      return salesData;
    } catch (error) {
      console.log(error);
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

export const addTitle = createAsyncThunk(
  'sales/addTitle',
  async (titleStructure, { rejectWithValue }) => {
    const { saleId, title } = titleStructure;
    try {
      const response = await fetch(`http://localhost:3000/api/v1/sales/${saleId}/add_title`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
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

export const deleteTitle = createAsyncThunk(
  'sales/deletePayment',
  async (titleStructure, { rejectWithValue }) => {
    const { saleId, titleId } = titleStructure;
    try {
      const response = await fetch(`http://localhost:3000/api/v1/sales/${saleId}/remove_payment/${titleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting sale from DB');
      return titleStructure;
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
        state.sales = action.payload.map((sale) => (
          determineSaleStatus(sale)
        ));
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
        transformSaleDate(action.payload);
        determineSaleStatus(action.payload);
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
          (sale) => {
            if (sale.id === id) {
              const updatedSale = {
                ...sale,
                electronic_receipt,
              };
              return transformSaleDate(determineSaleStatus(updatedSale));
            }
            return sale;
          },
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
          (sale) => {
            if (sale.id === id) {
              const updatedSale = {
                ...sale,
                payments: [...(sale.payments || []), payment],
              };
              return (determineSaleStatus(updatedSale));
            }
            return sale;
          },
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
      })
      .addCase(addTitle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTitle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload.sale;
        const { title_number, password } = action.payload;
        state.sales = state.sales.map(
          (sale) => {
            if (sale.id === id) {
              const updatedSale = {
                ...sale,
                title: {
                  title_number,
                  password,
                },
              };
              return determineSaleStatus(updatedSale);
            }
            return sale;
          },
        );
      })
      .addCase(addTitle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMessage, updateBoletaValue } = salesSlice.actions;
export default salesSlice.reducer;

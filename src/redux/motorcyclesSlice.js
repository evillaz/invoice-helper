import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteSaleFromDB, saveSaleToDB } from './salesSlice';
// Fetch motorcycles from DB

const API_BASE_URL = 'http://192.168.15.19:3000';

export const fetchMotorcycles = createAsyncThunk(
  'motorcycles/fetchMotorcycles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/motorcycles`);
      if (!response.ok) throw new Error('Error fetching motorcycles from DB');
      const data = await response.json();
      return data.map((d) => ({
        ...d,
        issueDate: d.fecha_emision,
        savedToDB: true,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Save new motorcycles to DB
export const saveMotorcyclesToDB = createAsyncThunk(
  'motorcycles/saveMotorcyclesToDB',
  async (newMotorcycles, { rejectWithValue }) => {
    try {
      if (newMotorcycles.length === 0) return { message: 'No new motorcycles to save', savedMotorcycles: [] };
      const responses = await Promise.all(
        newMotorcycles.map(async (motorcycle) => {
          const response = await fetch(`${API_BASE_URL}/api/v1/motorcycles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(motorcycle),
          });
          if (!response.ok) throw new Error('Error saving a motorcycle');
          return response.json();
        }),
      );

      return { message: 'Motorcycles saved successfully', savedMotorcycles: responses };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const saveMotorcycleToDB = createAsyncThunk(
  'motorcycles/saveMotorcycleToDB',
  async (motorcycle, { rejectWithValue }) => {
    try {
      console.log(motorcycle);
      const response = await fetch(`${API_BASE_URL}/api/v1/motorcycles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(motorcycle),
      });
      if (!response.ok) throw new Error('Error saving a motorcycle');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete motorcycles from DB
export const deleteMotorcycleFromDB = createAsyncThunk(
  'motorcycles/deleteMotorcycleFromDB',
  async (motorcycleId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/motorcycles/${motorcycleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting motorcycle from DB');
      return motorcycleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateAttribute = createAsyncThunk(
  'motorcycles/updateAttribute',
  async (sentAttribute, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/motorcycles/${sentAttribute.motorcycleId}/update_attribute`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attribute: sentAttribute.attribute,
          value: sentAttribute.colorValue,
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

const initialState = {
  motorcycles: [],
  selectedMotorcycles: [],
  status: 'idle',
  error: null,
  message: '',
};

const motorcyclesSlice = createSlice({
  name: 'motorcycles',
  initialState,
  reducers: {
    addXMLMotorcycles: (state, action) => {
      const newMotorcycles = action.payload.filter(
        (newMotorcycle) => !state.motorcycles.some(
          (existingMotorcycle) => existingMotorcycle.factura === newMotorcycle.factura,
        ),
      );
      state.motorcycles = [...state.motorcycles, ...newMotorcycles.map(
        (moto) => ({ ...moto, savedToDB: false }),
      )];
    },
    removeMotorcycle: (state, action) => {
      state.motorcycles = state.motorcycles.filter(
        (motorcycle) => motorcycle.factura !== action.payload,
      );
      state.selectedMotorcycles = state.selectedMotorcycles.filter(
        (motorcycle) => motorcycle.factura !== action.payload,
      );
    },
    toggleSelectMotorcycle: (state, action) => {
      const motorcycleId = action.payload;
      const exists = state.selectedMotorcycles.some((moto) => moto.factura === motorcycleId);
      state.selectedMotorcycles = exists
        ? state.selectedMotorcycles.filter((moto) => moto.factura !== motorcycleId)
        : [...state.selectedMotorcycles, state.motorcycles.find(
          (moto) => moto.factura === motorcycleId,
        )];
    },
    clearMotorcycles: (state) => {
      state.motorcycles = [];
      state.selectedMotorcycles = [];
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMotorcycles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMotorcycles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.motorcycles = action.payload;
      })
      .addCase(fetchMotorcycles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveMotorcyclesToDB.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveMotorcyclesToDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.motorcycles = [...state.motorcycles, ...action.payload.savedMotorcycles];
        state.message = action.payload.message;
      })
      .addCase(saveMotorcyclesToDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = action.payload;
      })
      .addCase(deleteMotorcycleFromDB.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMotorcycleFromDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.motorcycles = state.motorcycles.filter(
          (motorcycle) => motorcycle.factura !== action.payload,
        );
        state.selectedMotorcycles = state.selectedMotorcycles.filter(
          (motorcycle) => motorcycle.factura !== action.payload,
        );
      })
      .addCase(deleteMotorcycleFromDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteSaleFromDB.fulfilled, (state, action) => {
        const deletedSaleMotorcycle = action.payload.motorcycle.factura;
        state.motorcycles = state.motorcycles.map(
          (moto) => (moto.factura === deletedSaleMotorcycle
            ? { ...moto, sale: null }
            : moto),
        );
        state.selectedMotorcycles = state.selectedMotorcycles.map(
          (moto) => (moto.factura === deletedSaleMotorcycle
            ? { ...moto, sale: null }
            : moto),
        );
      })
      .addCase(saveSaleToDB.fulfilled, (state, action) => {
        const savedSaleMotorcycle = action.payload.motorcycle.factura;
        state.motorcycles = state.motorcycles.map(
          (moto) => (moto.factura === savedSaleMotorcycle
            ? { ...moto, sale: action.payload }
            : moto),
        );
        state.selectedMotorcycles = state.selectedMotorcycles.map(
          (moto) => (moto.factura === savedSaleMotorcycle
            ? { ...moto, sale: action.payload }
            : moto),
        );
        state.selectedMotorcycles = state.selectedMotorcycles.filter(
          (moto) => moto.factura !== savedSaleMotorcycle,
        );
      })
      .addCase(updateAttribute.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAttribute.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updated = action.payload;
        const motorcycle = state.motorcycles.find((m) => m.id === updated.id);
        if (motorcycle) {
          motorcycle.color = updated.color;
        }
      })
      .addCase(updateAttribute.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  addXMLMotorcycles, removeMotorcycle, toggleSelectMotorcycle, clearMotorcycles, clearMessage,
} = motorcyclesSlice.actions;
export default motorcyclesSlice.reducer;

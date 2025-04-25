import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteSaleFromDB, saveSaleToDB } from './salesSlice';
// Fetch motorcycles from DB
export const fetchMotorcycles = createAsyncThunk(
  'motorcycles/fetchMotorcycles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/motorcycles');
      if (!response.ok) throw new Error('Error fetching motorcycles from DB');
      const data = await response.json();

      return data.map((motorcycle) => ({
        factura: motorcycle.factura,
        modelo: motorcycle.modelo,
        marca: motorcycle.marca,
        color: motorcycle.color,
        numero_de_chasis: motorcycle.numero_de_chasis,
        numero_de_motor: motorcycle.numero_de_motor,
        dua: motorcycle.dua,
        anio: motorcycle.anio,
        savedToDB: true,
        sale: motorcycle.sale,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Save new motorcycles to DB
export const saveMotorcyclesToDB = createAsyncThunk(
  'motorcycles/saveMotorcyclesToDB',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { motorcycles } = getState().motorcycles;
      const newMotorcycles = motorcycles.filter((moto) => !moto.savedToDB);

      if (newMotorcycles.length === 0) return { message: 'No new motorcycles to save', savedMotorcycles: [] };

      const responses = await Promise.all(
        newMotorcycles.map(async (motorcycle) => {
          const response = await fetch('http://localhost:3000/api/v1/motorcycles', {
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

// Delete motorcycles from DB
export const deleteMotorcycleFromDB = createAsyncThunk(
  'motorcycles/deleteMotorcycleFromDB',
  async (motorcycleId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/motorcycles/${motorcycleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting motorcycle from DB');
      return motorcycleId;
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
        state.motorcycles = state.motorcycles.map(
          (moto) => (action.payload.savedMotorcycles.some((saved) => saved.factura === moto.factura)
            ? { ...moto, savedToDB: true }
            : moto),
        );
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
      });
  },
});

export const {
  addXMLMotorcycles, removeMotorcycle, toggleSelectMotorcycle, clearMotorcycles, clearMessage,
} = motorcyclesSlice.actions;
export default motorcyclesSlice.reducer;

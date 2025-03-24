import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
  selectedInvoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoices: (state, action) => {
      const newInvoices = action.payload.filter(
        (newInvoice) => !state.invoices.some(
          (existingInvoice) => existingInvoice[0]?.['cbc:ID'] === newInvoice[0]?.['cbc:ID'],
        ),
      );
      state.invoices = [...state.invoices, ...newInvoices];
    },
    removeInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice[0]['cbc:ID'] !== action.payload,
      );
      state.selectedInvoices = state.selectedInvoices.filter(
        (invoice) => invoice[0]['cbc:ID'] !== action.payload,
      );
    },
    toggleSelectInvoice: (state, action) => {
      const invoiceId = action.payload;
      const invoice = state.invoices.find(
        (inv) => inv[0]['cbc:ID'] === invoiceId,
      );

      if (!invoice) return;

      const exists = state.selectedInvoices.some(
        (selected) => selected[0]['cbc:ID'] === invoiceId,
      );

      if (exists) {
        state.selectedInvoices = state.selectedInvoices.filter(
          (inv) => inv[0]['cbc:ID'] !== invoiceId,
        );
      } else {
        state.selectedInvoices.push(invoice);
      }
    },
  },
});

export const { addInvoices, removeInvoice, toggleSelectInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;

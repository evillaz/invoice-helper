import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  xmlInvoices: [],
  selectedInvoices: [],
};

const xmlInvoicesSlice = createSlice({
  name: 'xmlInvoices',
  initialState,
  reducers: {
    addXMLInvoices: (state, action) => {
      const newInvoices = action.payload.filter(
        (newInvoice) => !state.xmlInvoices.some(
          (existingInvoice) => existingInvoice?.factura === newInvoice?.factura,
        ),
      );
      state.xmlInvoices = [...state.xmlInvoices, ...newInvoices];
    },
    removeXMLInvoice: (state, action) => {
      state.xmlInvoices = state.xmlInvoices.filter(
        (invoice) => invoice.factura !== action.payload,
      );
      state.selectedInvoices = state.selectedInvoices.filter(
        (invoice) => invoice.factura !== action.payload,
      );
    },
    toggleSelectXMLInvoice: (state, action) => {
      const invoiceId = action.payload;
      const invoice = state.xmlInvoices.find(
        (inv) => inv.factura === invoiceId,
      );

      if (!invoice) return;

      const exists = state.selectedInvoices.some(
        (selected) => selected.factura === invoiceId,
      );

      if (exists) {
        state.selectedInvoices = state.selectedInvoices.filter(
          (inv) => inv.factura !== invoiceId,
        );
      } else {
        state.selectedInvoices.push(invoice);
      }
    },
    clearXMLInvoices: (state) => {
      state.xmlInvoices = [];
      state.selectedInvoices = [];
    },
  },
});

export const {
  addXMLInvoices, removeXMLInvoice, toggleSelectXMLInvoice, clearXMLInvoices,
} = xmlInvoicesSlice.actions;
export default xmlInvoicesSlice.reducer;

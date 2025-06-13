import { createContext, useContext } from 'react';

export const SaleContext = createContext({
  sale: {},
});

export const useSale = () => {
  const context = useContext(SaleContext);
  if (!context) throw new Error('useSale must be used within a SaleProvider');
  return context;
};

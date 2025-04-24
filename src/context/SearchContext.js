import { createContext, useContext } from 'react';

export const SearchContext = createContext({
  searchQuery: '',
  setSearchQuery: () => {},
});

export const useSearchQuery = () => useContext(SearchContext);

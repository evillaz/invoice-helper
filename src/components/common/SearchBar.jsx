import React from 'react';
import { useSearchQuery } from '../../context/SearchContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search invoice..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />
    </div>
  );
};

export default SearchBar;

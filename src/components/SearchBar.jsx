import PropTypes from 'prop-types';
import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
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

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;

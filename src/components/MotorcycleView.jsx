import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MotorcyclesTable from './MotorcycleTable';
import SearchBar from './SearchBar';
import SaveMotorcyclesButton from './SaveMotorcyclesButton';
import UploadXml from './UploadXml';

const MotorcycleView = () => {
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  const selectedMotorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMotorcycles = motorcycles.filter((motorcycle) => {
    const invoiceId = motorcycle?.factura;
    return (
      selectedMotorcycles.some((selected) => selected.factura === invoiceId)
      || Object.values(motorcycle).some((item) => typeof item === 'string' && item.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto">
      <UploadXml />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SaveMotorcyclesButton />
      {filteredMotorcycles.length > 0 && (
        <MotorcyclesTable motorcycles={filteredMotorcycles} />
      )}
    </div>
  );
};

export default MotorcycleView;

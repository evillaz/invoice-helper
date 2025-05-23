import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MotorcyclesTable from './MotorcycleTable';
import SearchBar from '../common/SearchBar';
import SaveMotorcyclesButton from './SaveMotorcyclesButton';
import UploadXml from '../common/UploadXml';
import { SearchContext } from '../../context/SearchContext';
import Modal from '../common/Modal';

const MotorcycleView = () => {
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  const selectedMotorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const [searchQuery, setSearchQuery] = useState('');
  const [showXmlUploader, setShowXmlUploader] = useState(false);
  console.log(motorcycles);
  
  const handleShowXmluploader = () => {
    setShowXmlUploader(true);
  };
  const handleCloseXmluploader = () => {
    setShowXmlUploader(false);
  };
  const noSaleMotorcycles = motorcycles.filter((motorcycle) => motorcycle.sale === null
    || motorcycle.sale === undefined);

  const filteredMotorcycles = noSaleMotorcycles.filter((motorcycle) => {
    const invoiceId = motorcycle?.factura;
    const matchesSelected = selectedMotorcycles.some((selected) => selected.factura === invoiceId);
    const matchesSearch = Object.values(motorcycle).some(
      (item) => typeof item === 'string' && item.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return matchesSelected || matchesSearch;
  });

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="p-4 border rounded-lg shadow-md w-96 mx-auto">
        {showXmlUploader
          ? (
            <Modal RenderComponent={UploadXml} closeModal={handleCloseXmluploader} />
          ) : (
            <button type="button" onClick={handleShowXmluploader}>
              Agregar factura/s xml
            </button>
          )}
        <SearchBar />
        <SaveMotorcyclesButton />
        {filteredMotorcycles.length > 0 && (
          <MotorcyclesTable motorcycles={filteredMotorcycles} />
        )}
      </div>
    </SearchContext.Provider>
  );
};

export default MotorcycleView;

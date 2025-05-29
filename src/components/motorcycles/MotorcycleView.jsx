import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MotorcyclesTable from './MotorcycleTable';
import SearchBar from '../common/SearchBar';
import SaveMotorcyclesButton from './SaveMotorcyclesButton';
import UploadXml from '../common/UploadXml';
import { SearchContext } from '../../context/SearchContext';
import Modal from '../common/Modal';
import MotorcycleForm from './MotorcycleForm';
import FilterByDate from '../common/FilterByDate';

const MotorcycleView = () => {
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  const selectedMotorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const [searchQuery, setSearchQuery] = useState('');
  const [showXmlUploader, setShowXmlUploader] = useState(false);
  const [showMotoRegistration, setShowMotoRegistration] = useState(false);
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleShowXmluploader = () => {
    setShowXmlUploader(true);
  };
  const handleCloseXmluploader = () => {
    setShowXmlUploader(false);
  };

  const handleShowMotoRegistration = () => {
    setShowMotoRegistration(true);
  };
  const handleCloseMotoRegistration = () => {
    setShowMotoRegistration(false);
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

  const filteredMotorcyclesByDate = filteredMotorcycles.filter((motorcycle) => {
    if (!startYear || !startMonth || !endMonth || !endYear) return true;

    const issueDate = new Date(motorcycle.issueDate);
    const startDate = new Date(`${startYear}-${startMonth}-01`);
    const endDate = new Date(`${endYear}-${endMonth}-01`);

    // Ajustar al último día del mes final
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    return issueDate >= startDate && issueDate <= endDate;
  });

  return (
    <>
      <FilterByDate
        startMonth={startMonth}
        endMonth={endMonth}
        startYear={startYear}
        endYear={endYear}
        onChangeStartMonth={setStartMonth}
        onChangeEndMonth={setEndMonth}
        onChangeStartYear={setStartYear}
        onChangeEndYear={setEndYear}
      />
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
          {showMotoRegistration
            ? (
              <Modal RenderComponent={MotorcycleForm} closeModal={handleCloseMotoRegistration} />
            ) : (
              <button type="button" onClick={handleShowMotoRegistration}>
                Agregar moto/s
              </button>
            )}

          <SearchBar />
          <SaveMotorcyclesButton />
          {filteredMotorcyclesByDate.length > 0 && (
          <MotorcyclesTable motorcycles={filteredMotorcyclesByDate} />
          )}
        </div>
      </SearchContext.Provider>
    </>
  );
};

export default MotorcycleView;

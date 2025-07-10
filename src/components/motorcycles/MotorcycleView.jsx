import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import MotorcyclesTable from './MotorcycleTable';
import SearchBar from '../common/SearchBar';
import SaveMotorcyclesButton from './SaveMotorcyclesButton';
import UploadXml from '../common/UploadXml';
import { SearchContext } from '../../context/SearchContext';
import Modal from '../common/Modal';
import MotorcycleForm from './MotorcycleForm';
import FilterByDate from '../utils/FilterByDate';

const MotorcycleView = () => {
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  const selectedMotorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const [searchQuery, setSearchQuery] = useState('');
  const [showXmlUploader, setShowXmlUploader] = useState(false);
  const [showMotoRegistration, setShowMotoRegistration] = useState(false);
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [startYear, setStartYear] = useState('2025');
  const [endYear, setEndYear] = useState('2025');
  const [filteredByDateData, setFilteredByDateData] = useState([]);

  const handleFilterByDate = useCallback((newData) => {
    // Evitar actualizar si los datos no han cambiado
    const isSameLength = filteredByDateData.length === newData.length;
    const isSameContent = isSameLength
      && filteredByDateData.every((item, index) => item.factura === newData[index].factura);

    if (!isSameContent) {
      setFilteredByDateData(newData);
    }
  }, [filteredByDateData]);

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

  const searchContextValue = useMemo(
    () => ({ searchQuery, setSearchQuery }),
    [searchQuery, setSearchQuery],
  );

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
        data={filteredMotorcycles}
        onFilter={handleFilterByDate}
      />
      <SearchContext.Provider value={searchContextValue}>
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
          {filteredByDateData.length > 0 && (
          <MotorcyclesTable motorcycles={filteredByDateData} />
          )}
        </div>
      </SearchContext.Provider>
    </>
  );
};

export default MotorcycleView;

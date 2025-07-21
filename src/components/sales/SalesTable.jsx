import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import SaleItem from './SaleItem';
import SearchBar from '../common/SearchBar';
import { SearchContext } from '../../context/SearchContext';
import DocumentPreviewButton from '../documents/DocumentPreviewButton';
import Boleta from '../documents/Boleta';
import FilterByDate from '../utils/FilterByDate';

const SalesTable = () => {
  const sales = useSelector((state) => state.sales.sales);
  const [searchQuery, setSearchQuery] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [startYear, setStartYear] = useState('2025');
  const [endYear, setEndYear] = useState('2025');
  const filterByDate = (data) => data.filter((d) => {
    if (!startYear || !startMonth || !endYear) return true;
    const issueDate = d.sale_date || d.issueDate;
    const startDate = {
      month: startMonth,
      year: startYear,
    };
    const endDate = endMonth ? {
      month: endMonth,
      year: endYear,
    } : '';
    if (endDate) {
      return ((issueDate.month >= startDate.month)
        && (issueDate.year === Number(startDate.year)))
        && (issueDate.month < endDate.month)
        && (issueDate.year <= Number(endDate.year));
    }
    return (issueDate.month === startDate.month)
        && (issueDate.year === Number(startDate.year));
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  function getNestedValue(obj, path) {
    return path.split('.').reduce((o, p) => o?.[p], obj);
  }

  const searchedSales = sales.filter((sale) => {
    const checkMatch = (obj) => Object.values(obj).some((item) => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(searchQuery.toLocaleLowerCase());
      } if (typeof item === 'object' && item !== null) {
        return checkMatch(item); // Recursively check nested objects
      }
      return false;
    });
    return checkMatch(sale);
  });

  const filteredSales = filterByDate(searchedSales);

  const sortedSales = filteredSales.sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = getNestedValue(a, sortConfig.key);
    let bValue = getNestedValue(b, sortConfig.key);

    // Convert to string and lowercase for consistent comparison
    aValue = aValue?.toString().toLowerCase() || '';
    bValue = bValue?.toString().toLowerCase() || '';

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
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
      />
      <DocumentPreviewButton DocumentComponent={Boleta} />
      {sales && (
        <SearchContext.Provider value={searchContextValue}>
          <SearchBar />
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('status')}>Estado</th>
                <th onClick={() => handleSort('motorcycle.factura')}>Factura</th>
                <th onClick={() => handleSort('motorcycle.modelo')}>Modelo</th>
                <th onClick={() => handleSort('motorcycle.numero_de_chasis')}>Numero de Chasis</th>
                <th onClick={() => handleSort('motorcycle.numero_de_motor')}>Numero de Motor</th>
                <th>COLOR</th>
                <th>D.U.A</th>
                <th>Fecha Adquisicion</th>
                <th onClick={() => handleSort('customer.dni')}>DNI</th>
                <th onClick={() => handleSort('customer.nombre')}>NOMBRE</th>
                <th onClick={() => handleSort('customer.direccion')}>DIRECCION</th>
                <th onClick={() => handleSort('customer.direccion')}>DEPARTAMENTO</th>
                <th onClick={() => handleSort('customer.direccion')}>PROVINCIA</th>
                <th onClick={() => handleSort('customer.direccion')}>DISTRITO</th>
                <th onClick={() => handleSort('total_amount')}>MONTO</th>
                <th>IGV</th>
                <th onClick={() => handleSort('payments')}>PAGOS</th>
                <th onClick={() => handleSort('issueDate')}>FECHA VENTA</th>
                <th onClick={() => handleSort('title.title_number')}>TITULO</th>
                <th onClick={() => handleSort('electronic_receipt.receipt_number')}>BOLETA</th>
              </tr>
            </thead>
            <tbody>
              {sortedSales.map((sale) => (
                <tr key={`sale${sale.id}`} id={`sale ${sale.id}`}>
                  <SaleItem key={`saleItem${sale.id}`} sale={sale} />
                </tr>
              ))}
            </tbody>
          </table>
        </SearchContext.Provider>
      )}
    </>
  );
};

export default SalesTable;

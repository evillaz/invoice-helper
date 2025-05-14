import { useSelector } from 'react-redux';
import { useState } from 'react';
import SaleItem from './SaleItem';
import SearchBar from './SearchBar';
import { SearchContext } from '../context/SearchContext';
import GetVouchersPdf from './GetVouchersPdf';

const SalesTable = () => {
  const sales = useSelector((state) => state.sales.sales);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSales = sales.filter((sale) => {
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

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle column click
  function getNestedValue(obj, path) {
    return path.split('.').reduce((o, p) => o?.[p], obj);
  }

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Sort logic
  const sortedSales = [...filteredSales].sort((a, b) => {
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

  return (
    <>
      <GetVouchersPdf />
      {sales && (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
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
                <th onClick={() => handleSort('customer.dni')}>DNI</th>
                <th onClick={() => handleSort('customer.nombre')}>NOMBRE</th>
                <th onClick={() => handleSort('customer.direccion')}>DIRECCION</th>
                <th onClick={() => handleSort('customer.direccion')}>DEPARTAMENTO</th>
                <th onClick={() => handleSort('customer.direccion')}>PROVINCIA</th>
                <th onClick={() => handleSort('customer.direccion')}>DISTRITO</th>
                <th onClick={() => handleSort('total_amount')}>MONTO</th>
                <th>IGV</th>
                <th onClick={() => handleSort('payments')}>PAGOS</th>
              </tr>
            </thead>
            <tbody>
              {sortedSales.map((sale) => (
                <tr key={`sale ${sale.id}`} id={`sale ${sale.id}`}>
                  <SaleItem sale={sale} />
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

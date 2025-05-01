import { useState } from 'react';
import { useSelector } from 'react-redux';
import SalesTable from './SalesTable';
import ShowDetailsButton from './ShowDetailsButton';
import NewSalesTable from './NewSalesTable';

const SalesView = () => {
  const motorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const [showMotoDetails, setShowMotoDetails] = useState(false);

  const noSaleMotorcycles = motorcycles.filter((motorcycle) => motorcycle.sale === null
    || motorcycle.sale === undefined);
  return (
    <div>
      <ShowDetailsButton showDetails={showMotoDetails} setShowDetails={setShowMotoDetails} />
      <NewSalesTable motorcycles={noSaleMotorcycles} showDetails={showMotoDetails} />
      <SalesTable />
    </div>
  );
};

export default SalesView;

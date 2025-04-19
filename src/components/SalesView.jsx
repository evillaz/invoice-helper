import { useState } from "react";
import { useSelector } from "react-redux";

const SalesView = () => {
  const selectedMotorcycles = useSelector((state) => state.motorcycles.selectedMotorcycles);
  const [showMotoDetails, setShowMotoDetails] = useState(false);

  return (
    <>
    </>
  );
};

export default SalesView;


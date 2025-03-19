import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const POAGenerator = () => {
  const navigate = useNavigate();
  
  const invoices = useSelector((state) => state.invoices.invoices);
  const selectedInvoices = useSelector((state) => state.invoices.selectedInvoices);
  
  console.log(invoices);
  console.log(selectedInvoices);

  
  return (
    <div>
      <h1>gen</h1>
      <button
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
        onClick={() => navigate("/", { state: { selectedInvoices, invoices } })}
      >
        Back to Upload
      </button>
    </div>
  );
};

export default POAGenerator;
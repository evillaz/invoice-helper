import { useSelector } from 'react-redux';
import React from 'react';

import CustomerRegistrationForm from './CustomerRegistrationForm';

const CustomerView = () => {
  const { customers } = useSelector((state) => state.customers);
  console.log(customers);
  return (
    <div>
      <CustomerRegistrationForm />
    </div>
  );
};

export default CustomerView;

import React, { useContext } from 'react';
import { SupplierContext } from '../context/SupplierContext';
import SupplierList from '../components/SupplierList';
import SupplierForm from '../components/SupplierForm';

const SuppliersPage = () => {
  const { suppliers, setSuppliers } = useContext(SupplierContext);

  return (
    <div>
      <h1>Suppliers</h1>
      <SupplierForm setSuppliers={setSuppliers} />
      <SupplierList suppliers={suppliers} />
    </div>
  );
};

export default SuppliersPage;

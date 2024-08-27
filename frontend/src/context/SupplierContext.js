import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };
    fetchSuppliers();
  }, []);

  return (
    <SupplierContext.Provider value={{ suppliers, setSuppliers }}>
      {children}
    </SupplierContext.Provider>
  );
};

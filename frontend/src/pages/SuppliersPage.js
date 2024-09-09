import React, { useState, useEffect } from 'react';
import SupplierForm from '../components/SupplierManagement/SupplierForm';
import SupplierList from '../components/SupplierManagement/SupplierList';
import { Container, Grid } from '@mui/material';
import axios from 'axios';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch suppliers on page load
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

      const response = await axios.get('http://localhost:9001/api/suppliers', {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to the request headers
        },
      });

      setSuppliers(response.data); // Adjust if API returns supplier array directly
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSupplierUpdated = () => {
    setEditSupplierId(null); // Reset edit mode
    fetchSuppliers(); // Refresh the supplier list after create/update
  };

  const handleEditSupplier = (supplierId) => {
    setEditSupplierId(supplierId); // Set supplierId for editing
  };

  const handleSupplierDeleted = async (supplierId) => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      await axios.delete(`http://localhost:9001/api/suppliers/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to the request headers
        },
      });
      fetchSuppliers(); // Refresh the supplier list after delete
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SupplierForm
            supplierId={editSupplierId}
            onSupplierUpdated={handleSupplierUpdated}
            setSuppliers={setSuppliers} // Ensure suppliers are updated
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {isLoading ? (
            <p>Loading suppliers...</p>
          ) : (
            <SupplierList
              suppliers={suppliers}
              onEditSupplier={handleEditSupplier}
              onSupplierDeleted={handleSupplierDeleted}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SuppliersPage;

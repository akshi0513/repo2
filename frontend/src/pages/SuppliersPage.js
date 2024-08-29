import React, { useState } from 'react';
import SupplierForm from '../components/SupplierManagement/SupplierForm';
import SupplierList from '../components/SupplierManagement/SupplierList';
import { Container, Grid } from '@mui/material';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SupplierForm setSuppliers={setSuppliers} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SupplierList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SuppliersPage;

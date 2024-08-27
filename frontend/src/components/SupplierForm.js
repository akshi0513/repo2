import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const SupplierForm = ({ setSuppliers }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [productsSupplied, setProductsSupplied] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/suppliers', {
        name,
        contact_info: contactInfo,
        products_supplied: productsSupplied.split(',').map(item => item.trim()),
      });
      setName('');
      setContactInfo('');
      setProductsSupplied('');
      setSuppliers(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding supplier', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2">Add Supplier</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Supplier Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField label="Contact Information" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} fullWidth />
        <TextField label="Products Supplied" value={productsSupplied} onChange={(e) => setProductsSupplied(e.target.value)} fullWidth />
        <Button type="submit" variant="contained" color="primary">Add Supplier</Button>
      </form>
    </Container>
  );
};

export default SupplierForm;

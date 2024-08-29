import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const SupplierForm = ({ setSuppliers }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

      const response = await axios.post(
        'http://localhost:9001/api/suppliers',
        {
          name,
          contact_info: contactInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Add the token to the Authorization header
          }
        }
      );

      setSuppliers(prev => [...prev, response.data]);
      setName('');
      setContactInfo('');
    } catch (error) {
      console.error('Error adding supplier', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Add Supplier</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField label="Contact Information" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required fullWidth />
        <Button type="submit" variant="contained" color="primary">Add Supplier</Button>
      </form>
    </Container>
  );
};

export default SupplierForm;

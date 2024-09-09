import React, { useState } from 'react';
import { TextField, Button, Container, Typography, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import axios from 'axios';

const SupplierForm = ({ setSuppliers }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [products, setProducts] = useState(['']); // Initialize with an empty product field

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

      const response = await axios.post(
        'http://localhost:9001/api/suppliers',
        {
          name,
          contact_info: contactInfo,
          products, // Send the list of products entered
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
      setProducts(['']); // Reset the product fields
    } catch (error) {
      console.error('Error adding supplier', error);
    }
  };

  // Handle change for each product input
  const handleProductChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = value;
    setProducts(updatedProducts);
  };

  // Add new product input field
  const handleAddProduct = () => {
    setProducts([...products, '']);
  };

  // Remove a product input field
  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <Container>
      <Typography variant="h4">Add Supplier</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Information"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        
        <Typography variant="h6" margin="normal">Products Supplied</Typography>

        {/* Dynamic product input fields */}
        {products.map((product, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <TextField
              label={`Product ${index + 1}`}
              value={product}
              onChange={(e) => handleProductChange(index, e.target.value)}
              fullWidth
              required
            />
            {products.length > 1 && (
              <IconButton onClick={() => handleRemoveProduct(index)} color="secondary">
                <RemoveCircleOutline />
              </IconButton>
            )}
          </div>
        ))}

        <Button
          onClick={handleAddProduct}
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutline />}
          style={{ marginBottom: '10px' }}
        >
          Add Product
        </Button>

        <Button type="submit" variant="contained" color="primary">Add Supplier</Button>
      </form>
    </Container>
  );
};

export default SupplierForm;

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const ProductForm = ({ setProducts }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', {
        name,
        sku,
        description,
        price: parseFloat(price),
        current_stock: parseInt(currentStock),
        reorder_level: parseInt(reorderLevel),
      });
      setName('');
      setSku('');
      setDescription('');
      setPrice('');
      setCurrentStock('');
      setReorderLevel('');
      setProducts(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2">Add Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField label="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required fullWidth />
        <TextField label="Current Stock" type="number" value={currentStock} onChange={(e) => setCurrentStock(e.target.value)} required fullWidth />
        <TextField label="Reorder Level" type="number" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} required fullWidth />
        <Button type="submit" variant="contained" color="primary">Add Product</Button>
      </form>
    </Container>
  );
};

export default ProductForm;

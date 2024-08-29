import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const ProductForm = ({ setProducts, editingProduct, setEditingProduct, fetchProducts }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setSku(editingProduct.sku);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setCurrentStock(editingProduct.current_stock);
      setReorderLevel(editingProduct.reorder_level);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');

      if (editingProduct) {
        // Update product
        await axios.put(
          `http://localhost:9001/api/products/${editingProduct._id}`,
          {
            name,
            sku,
            description,
            price: parseFloat(price),
            current_stock: parseInt(currentStock),
            reorder_level: parseInt(reorderLevel),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingProduct(null);
      } else {
        // Add new product
        const response = await axios.post(
          'http://localhost:9001/api/products',
          {
            name,
            sku,
            description,
            price: parseFloat(price),
            current_stock: parseInt(currentStock),
            reorder_level: parseInt(reorderLevel),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts((prev) => [...prev, response.data]);
      }

      fetchProducts();
      setName('');
      setSku('');
      setDescription('');
      setPrice('');
      setCurrentStock('');
      setReorderLevel('');
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">{editingProduct ? 'Edit Product' : 'Add Product'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField label="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required fullWidth />
        <TextField label="Current Stock" type="number" value={currentStock} onChange={(e) => setCurrentStock(e.target.value)} required fullWidth />
        <TextField label="Reorder Level" type="number" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} required fullWidth />
        <Button type="submit" variant="contained" color="primary">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const OrderForm = ({ setOrders }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('Pending'); // Default status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:9001/api/orders', {
        product_id: productId,
        quantity: parseInt(quantity),
        status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(prev => [...prev, response.data]);
      setProductId('');
      setQuantity('');
      setStatus('Pending'); // Reset status to default
    } catch (error) {
      console.error('Error adding order', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Add Order</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Add Order</Button>
      </form>
    </Container>
  );
};

export default OrderForm;

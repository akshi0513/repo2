import React, { useState, useEffect } from 'react';
import OrderForm from '../components/OrderManagement/OrderForm';
import OrderList from '../components/OrderManagement/OrderList';
import { Container, Grid } from '@mui/material';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:9001/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <OrderForm setOrders={setOrders} />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderList orders={orders} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrdersPage;

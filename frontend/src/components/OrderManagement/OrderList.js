import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderList = ({ setOrders }) => {
  const [orders, setOrdersLocal] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:9001/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrdersLocal(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, [setOrders]);

  const handleDelete = async (orderId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:9001/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrdersLocal(prev => prev.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Order List</Typography>
      <List>
        {orders.map((order) => (
          <div key={order._id}>
            <ListItem>
              <ListItemText
                primary={`Order ID: ${order._id}`}
                secondary={`Product ID: ${order.product_id} | Quantity: ${order.quantity} | Status: ${order.status}`}
              />
              <IconButton onClick={() => console.log(`Edit order ${order._id}`)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(order._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default OrderList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Divider, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderList = () => {
  const [orders, setOrdersLocal] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null); // State for the order being edited
  const [editedQuantity, setEditedQuantity] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

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
  }, []);

  const handleEdit = (order) => {
    setEditingOrder(order);
    setEditedQuantity(order.quantity);
    setEditedStatus(order.status);
  };

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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedOrder = {
        ...editingOrder,
        quantity: editedQuantity,
        status: editedStatus
      };
      await axios.put(`http://localhost:9001/api/orders/${editingOrder._id}`, updatedOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrdersLocal(prev => prev.map(order => order._id === editingOrder._id ? updatedOrder : order));
      setEditingOrder(null); // Clear the editing state
    } catch (error) {
      console.error('Error saving order', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Order List</Typography>
      <List>
        {orders.map((order) => (
          <div key={order._id}>
            <ListItem>
              {editingOrder && editingOrder._id === order._id ? (
                <div>
                  <TextField
                    label="Quantity"
                    value={editedQuantity}
                    onChange={(e) => setEditedQuantity(e.target.value)}
                    type="number"
                  />
                  <TextField
                    label="Status"
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                  />
                  <Button onClick={handleSave}>Save</Button>
                  <Button onClick={() => setEditingOrder(null)}>Cancel</Button>
                </div>
              ) : (
                <ListItemText
                  primary={`Order ID: ${order._id}`}
                  secondary={`Product ID: ${order.product_id} | Quantity: ${order.quantity} | Status: ${order.status}`}
                />
              )}
              {!editingOrder && (
                <>
                  <IconButton onClick={() => handleEdit(order)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(order._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default OrderList;

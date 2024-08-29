import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = ({ onEdit, fetchProducts }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:9001/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:9001/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProducts();  // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Product List</Typography>
      <List>
        {products.map((product) => (
          <div key={product._id}>
            <ListItem>
              <ListItemText
                primary={product.name}
                secondary={`SKU: ${product.sku} | Price: $${product.price} | Stock: ${product.current_stock}`}
              />
              <IconButton onClick={() => onEdit(product)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(product._id)}>
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

export default ProductList;

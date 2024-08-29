import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [productsBelowReorderLevel, setProductsBelowReorderLevel] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');

        // Make the API request with the Authorization header
        const response = await axios.get('http://localhost:9001/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const products = response.data;

        setProducts(products);
        setTotalProducts(products.length);

        const stockValue = products.reduce((acc, product) => acc + product.price * product.current_stock, 0);
        setTotalStockValue(stockValue);

        const lowStockProducts = products.filter(product => product.current_stock < product.reorder_level);
        setProductsBelowReorderLevel(lowStockProducts.length);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Inventory Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Products</Typography>
              <Typography variant="h6">{totalProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Stock Value</Typography>
              <Typography variant="h6">${totalStockValue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Products Below Reorder Level</Typography>
              <Typography variant="h6">{productsBelowReorderLevel}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Products List
      </Typography>
      <List>
        {products.map((product) => (
          <div key={product._id}>
            <ListItem style={{ backgroundColor: product.current_stock < product.reorder_level ? '#ffdddd' : 'inherit' }}>
              <ListItemText
                primary={product.name}
                secondary={`SKU: ${product.sku} | Stock: ${product.current_stock} | Reorder Level: ${product.reorder_level}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h1">Inventory Management Dashboard</Typography>
      <Button component={Link} to="/products" variant="contained" color="primary">Manage Products</Button>
      <Button component={Link} to="/orders" variant="contained" color="primary">Manage Orders</Button>
      <Button component={Link} to="/suppliers" variant="contained" color="primary">Manage Suppliers</Button>
      <Button component={Link} to="/reports" variant="contained" color="primary">View Reports</Button>
    </Container>
  );
};

export default Dashboard;

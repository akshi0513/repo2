import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Inventory Management System
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/orders">Orders</Button>
        <Button color="inherit" component={Link} to="/suppliers">Suppliers</Button>
        <Button color="inherit" component={Link} to="/reports">Reports</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/signup">Signup</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

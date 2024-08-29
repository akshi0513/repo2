import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:9001/api/suppliers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Supplier List</Typography>
      <List>
        {suppliers.map((supplier) => (
          <div key={supplier._id}>
            <ListItem>
              <ListItemText
                primary={supplier.name}
                secondary={`Contact Info: ${supplier.contact_info}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default SupplierList;

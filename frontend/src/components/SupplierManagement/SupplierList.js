import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SupplierList = ({ suppliers, onEditSupplier, onSupplierDeleted }) => {
  if (!suppliers || suppliers.length === 0) {
    return <Typography>No suppliers found.</Typography>;
  }

  const handleEdit = (id) => {
    console.log("Edit clicked for supplier ID:", id);
    onEditSupplier(id);
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for supplier ID:", id);
    onSupplierDeleted(id);
  };

  return (
    <Container>
      <Typography variant="h4">Supplier List</Typography>
      <List>
        {suppliers.map((supplier) => (
          <ListItem key={supplier._id}>
            <ListItemText
              primary={supplier.name}
              secondary={
                <>
                  Contact: {supplier.contact_info}
                  <br />
                  Products Supplied: {supplier.products.map(product => product.name).join(', ')}
                </>
              }
            />
            <IconButton onClick={() => handleEdit(supplier._id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(supplier._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SupplierList;

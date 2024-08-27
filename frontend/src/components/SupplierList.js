import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SupplierList = ({ suppliers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Supplier Name</TableCell>
            <TableCell>Contact Information</TableCell>
            <TableCell>Products Supplied</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map(supplier => (
            <TableRow key={supplier._id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.contact_info}</TableCell>
              <TableCell>{supplier.products_supplied.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SupplierList;

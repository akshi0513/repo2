import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('total-stock-value'); // Default report type
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    try {
      const token = localStorage.getItem('authToken');
      let url = '';

      // Choose the correct endpoint based on the selected report type
      switch (reportType) {
        case 'total-stock-value':
          url = 'http://localhost:9001/api/reports/total-stock-value';
          break;
        case 'most-sold-products':
          url = 'http://localhost:9001/api/reports/most-sold-products';
          break;
        case 'least-sold-products':
          url = 'http://localhost:9001/api/reports/least-sold-products';
          break;
        case 'inventory-movement':
          url = 'http://localhost:9001/api/reports/inventory-movement';
          break;
        case 'supplier-performance':
          url = 'http://localhost:9001/api/reports/supplier-performance';
          break;
        default:
          return;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { start_date: startDate, end_date: endDate },
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error generating report', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Generate Reports</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth style={{ marginTop: '16px' }}>
            <InputLabel>Report Type</InputLabel>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              fullWidth
            >
              <MenuItem value="total-stock-value">Total Stock Value</MenuItem>
              <MenuItem value="most-sold-products">Most Sold Products</MenuItem>
              <MenuItem value="least-sold-products">Least Sold Products</MenuItem>
              <MenuItem value="inventory-movement">Inventory Movement</MenuItem>
              <MenuItem value="supplier-performance">Supplier Performance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateReport}
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
      {reportData && (
        <Container style={{ marginTop: '20px' }}>
          <Typography variant="h5">Report Data</Typography>
          <pre>{JSON.stringify(reportData, null, 2)}</pre>
        </Container>
      )}
    </Container>
  );
};

export default Reports;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:9001/api/reports', {
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

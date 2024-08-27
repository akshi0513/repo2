import React, { useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const ReportList = () => {
  const [reportData, setReportData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateReport = async () => {
    try {
      const response = await axios.get('/api/reports', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error generating report', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2">Generate Report</Typography>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button onClick={generateReport} variant="contained" color="primary">Generate Report</Button>
      {reportData && (
        <div>
          <Typography variant="h3">Report Results</Typography>
          {/* Render reportData here */}
        </div>
      )}
    </Container>
  );
};

export default ReportList;

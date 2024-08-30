import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Reports from '../components/Reporting/Reports';
import { Container, Typography } from '@mui/material';

const ReportsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Reports />
    </Container>
  );
};

export default ReportsPage;

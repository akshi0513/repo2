import axios from 'axios';

// Set the base URL for the API
const api = axios.create({
  baseURL: 'http://localhost:9001/api', 
});




export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to handle product operations
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post('/products', product, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to handle order operations
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to handle supplier operations
export const getSuppliers = async () => {
  try {
    const response = await api.get('/suppliers');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to handle reports
export const getReports = async (reportType, startDate, endDate) => {
  try {
    const response = await api.get(`/reports/${reportType}`, {
      params: { startDate, endDate },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { SupplierProvider } from './context/SupplierContext';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import SuppliersPage from './pages/SuppliersPage';
import ReportsPage from './pages/ReportsPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <Router>
      <ProductProvider>
        <OrderProvider>
          <SupplierProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              
            </Routes>
          </SupplierProvider>
        </OrderProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;

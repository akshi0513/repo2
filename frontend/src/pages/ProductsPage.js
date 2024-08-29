import React, { useState } from 'react';
import ProductForm from '../components/ProductManagement/ProductForm';
import ProductList from '../components/ProductManagement/ProductList';
import { Container, Grid } from '@mui/material';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const onEdit = (product) => {
    // Set the product that is being edited
    setEditingProduct(product);
  };

  const fetchProducts = async () => {
    
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ProductForm 
            setProducts={setProducts} 
            editingProduct={editingProduct} 
            setEditingProduct={setEditingProduct}
            fetchProducts={fetchProducts}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductList 
            onEdit={onEdit} 
            fetchProducts={fetchProducts}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage;

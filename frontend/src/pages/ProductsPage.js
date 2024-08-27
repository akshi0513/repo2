import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const { products, setProducts } = useContext(ProductContext);

  return (
    <div>
      <h1>Products</h1>
      <ProductForm setProducts={setProducts} />
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;

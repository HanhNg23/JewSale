import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "../scenes/products/ProductList";
import ProductDetail from "../scenes/products/ProductDetail";
import ProductForm from "../scenes/products/ProductForm";

const ProductsPage = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/new" element={<ProductForm />} />
      <Route path="/products/edit/:id" element={<ProductForm />} />
    </Routes>
  );
};

export default ProductsPage;

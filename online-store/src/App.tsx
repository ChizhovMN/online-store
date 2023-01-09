import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Header } from './pages/header';
import { Footer } from './pages/footer';
import { Cart } from './pages/cart/cart';
import { Main } from './pages/main/main';
import { Product } from './pages/product/product';
import { Error } from './pages/404/404';
import { Routes, Route, Navigate } from 'react-router-dom';
import { products as initialProducts } from './products';
import { loadInitialProductsData } from './store/store';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInitialProductsData(initialProducts));
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="404" element={<Error />} />
          <Route path="*" element={<Navigate to="404" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

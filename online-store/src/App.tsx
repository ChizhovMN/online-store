import React from 'react';
import './App.css';
import { Header } from './pages/header';
import { Footer } from './pages/footer';
import { Cart } from './pages/cart/cart';
import { Main } from './pages/main/main';
import { Product } from './pages/product/product';
import { Error } from './pages/404/404';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
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
          {/* TODO:  check url with render and redirect*/}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

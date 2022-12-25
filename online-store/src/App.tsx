import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
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

// type AppProps = {
//   products: ProductType[];
// };
export default function App() {
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInitialProductsData(initialProducts));
  }, [dispatch]);
  return (
    <>
      <Header cart={cartTotal} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Main cartTotal={cartTotal} setCart={setCartTotal} />} />
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

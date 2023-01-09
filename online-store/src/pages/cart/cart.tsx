import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartShopProducts } from '../../store/store';
import '../cart/cart.css';
import { CartItems } from './cartItems';

function Cart() {
  const cart = useSelector(selectCartShopProducts);
  return (
    <div className="cart">
      {cart.length > 0 ? <CartItems /> : <div className="not-found">Cart is empty!</div>}
    </div>
  );
}
export { Cart };

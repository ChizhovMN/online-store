import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { checkModal, selectCartShopProducts, updateCart } from '../store/store';

export function BuyButton() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartShopProducts);
  const item = cartItems.find((item) => item.id === Number(id));
  const isAdded = !!item;
  const addProduct = () => {
    if (!isAdded) {
      dispatch(
        updateCart({
          productId: Number(id),
          count: 1,
        })
      );
    }
    if (location.pathname !== '/online-store/cart') {
      navigate('/online-store/cart');
    }
    dispatch(checkModal(true));
  };
  return (
    <Button variant="text" onClick={addProduct}>
      Buy
    </Button>
  );
}

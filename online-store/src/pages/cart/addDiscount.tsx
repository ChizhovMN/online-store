import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDiscount, selectCart } from '../../store/store';
import { DiscountType } from '../../types';
import Button from '@mui/material/Button';

export const DiscountAdder = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const findItem: DiscountType | undefined = cart.discount.all.find(
    (item) => item.discount === cart.promo.toLowerCase()
  );
  const addedDiscount: DiscountType | undefined = cart.discount.current.find(
    (item) => item.discount === findItem?.discount
  );
  const promo = addedDiscount ? (
    <></>
  ) : findItem ? (
    <div className="promo">
      {findItem.name} - {findItem.procent}%
      <Button
        variant="text"
        onClick={() => {
          dispatch(addDiscount(findItem.discount));
        }}
      >
        ADD PROMO
      </Button>
    </div>
  ) : (
    <></>
  );
  return promo;
};

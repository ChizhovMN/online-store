import { Button } from '@mui/material';
import React, { useState, FC, PropsWithChildren } from 'react';
import { cartShop } from '../../../App';
import { products } from '../../../products';
import { CartType } from '../../../types';

type AddButtonProps = {
  id: number;
};

export const AddButton: FC<PropsWithChildren<AddButtonProps>> = ({ id }) => {
  const index = cartShop.findIndex((item: CartType) => item.id === id);
  const isAddToCart = index === -1 ? false : true;
  const [isAdd, setIsAdd] = useState(isAddToCart);
  return (
    <Button
      size="small"
      color="primary"
      onClick={() => {
        const index = cartShop.findIndex((item: CartType) => item.id === id);
        console.log(index, isAdd);
        if (index !== -1) {
          cartShop.splice(index, 1);
        } else {
          console.log('pushCart shop');
          cartShop.push({
            id: id,
            count: 1,
            cost: products[id - 1].price,
          });
        }

        console.log(cartShop);
        setIsAdd(!isAdd);
      }}
    >
      {isAdd ? 'Drop Cart' : 'Add Cart'}
    </Button>
  );
};

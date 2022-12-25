import { Button } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { selectSortedProducts } from '../../store/store';
import '../main/main.css';
import { ShopTable } from './components/shopTable';
import { CheckboxGenre } from './components/sortBox';
type MainProps = {
  cartTotal: number;
  setCart: React.Dispatch<React.SetStateAction<number>>;
};
const Main: FC<PropsWithChildren<MainProps>> = ({ cartTotal, setCart }) => {
  const products = useSelector(selectSortedProducts);
  return (
    <div className="shop">
      <Button onClick={() => setCart(cartTotal + 1)}>CLICK</Button>
      <CheckboxGenre sortItems={products} />
      <ShopTable items={products} />
    </div>
  );
};

export { Main };

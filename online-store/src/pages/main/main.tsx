import { Button } from '@mui/material';
import React, { useState, FC, PropsWithChildren } from 'react';
import { products } from '../../products';
// import { useDispatch, useSelector } from 'react-redux';
// import { filterByGroupsAC } from '../../store/actionCreators';
// import { products } from '../../products';
// import { productsSelector } from '../../store/selector';
import '../main/main.css';
import { ShopTable } from './components/shopTable';
import { CheckboxGenre } from './components/sortBox';
type MainProps = {
  cartTotal: number;
  setCart: React.Dispatch<React.SetStateAction<number>>;
};
const Main: FC<PropsWithChildren<MainProps>> = ({ cartTotal, setCart }) => {
  const [filterProducts, setFilterProducts] = useState(products);
  // const products = useSelector(productsSelector);
  // const dispatch = useDispatch();
  // console.log(dispatch);
  // const filterProducts = [...products];
  // console.log('sortproducts', filterProducts);
  // function filterBy41() {
  //   dispatch(filterByGroupsAC('Sum 41'));
  // }
  return (
    <div className="shop">
      <Button onClick={() => setCart(cartTotal + 1)}>CLICK</Button>
      <CheckboxGenre sortItems={products} />
      <ShopTable items={products} />
    </div>
  );
};

export { Main };

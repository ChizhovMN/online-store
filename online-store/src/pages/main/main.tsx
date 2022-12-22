import { Button } from '@mui/material';
import React, { useState } from 'react';
import { products } from '../../products';
// import { useDispatch, useSelector } from 'react-redux';
// import { filterByGroupsAC } from '../../store/actionCreators';
// import { products } from '../../products';
// import { productsSelector } from '../../store/selector';
import '../main/main.css';
import { ShopTable } from './components/shopTable';
import { CheckboxGenre } from './components/sortBox';

function Main() {
  const [filterProducts, setFilterProducts] = useState(products);
  // const products = useSelector(productsSelector);
  console.log(products);
  // const dispatch = useDispatch();
  // console.log(dispatch);
  // const filterProducts = [...products];
  // console.log('sortproducts', filterProducts);
  // function filterBy41() {
  //   dispatch(filterByGroupsAC('Sum 41'));
  // }
  return (
    <div className="shop">
      {/* <Button onClick={filterBy41}>Sum 41</Button> */}
      <CheckboxGenre sortItems={products} />
      <ShopTable items={products} />
    </div>
  );
}

export { Main };

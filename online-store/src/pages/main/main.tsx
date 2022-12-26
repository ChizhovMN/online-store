import React from 'react';
import { useSelector } from 'react-redux';
import { selectSortedProducts } from '../../store/store';
import '../main/main.css';
import { ShopTable } from './components/shopTable';
import { CheckboxGenre } from './components/sortBox';

const Main = () => {
  const products = useSelector(selectSortedProducts);
  return (
    <div className="shop">
      <CheckboxGenre sortItems={products} />
      <ShopTable items={products} />
    </div>
  );
};

export { Main };

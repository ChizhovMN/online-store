import React from 'react';
import { useSelector } from 'react-redux';
import { selectFieldSearch, selectSortedProducts } from '../../store/store';
import '../main/main.css';
import { ShopTable } from './components/shopTable';
import { CheckboxGenre } from './components/sortBox';

const Main = () => {
  useSelector(selectSortedProducts);
  const filterProducts = useSelector(selectFieldSearch);
  return (
    <div className="shop">
      <CheckboxGenre sortItems={filterProducts} />
      <ShopTable items={filterProducts} />
    </div>
  );
};

export { Main };

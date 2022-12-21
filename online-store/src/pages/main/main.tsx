import React from 'react';
import { products } from '../../products';
import '../main/main.css';
import { ShopTable } from './components/shopTable';
import CheckboxGenre from './components/sortBox';

function Main() {
  return (
    <div className="shop">
      <CheckboxGenre />
      <ShopTable items={products} />
    </div>
  );
}

export { Main };

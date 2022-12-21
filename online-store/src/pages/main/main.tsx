import React from 'react';
import { products } from '../../products';
import '../main/main.css';
import { ShopTable } from './components/shopTable';

function Main() {
  return (
    <div className="shop">
      <ShopTable {...products} />
    </div>
  );
}

export { Main };

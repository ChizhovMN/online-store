import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../store/store';
export const CountCart = () => {
  const total = useSelector(selectCartTotal);
  console.log(total);
  return <div className="header-count">Cart total: ${total}</div>;
};

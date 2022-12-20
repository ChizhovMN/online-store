import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Products } from '../../../types';

export const TableItemSmall = ({ thumbnail, group, album, year, format, price, id }: Products) => {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className="table-item"
      onClick={() => {
        navigate(`/product/${id}`);
      }}
    >
      <figure className="figure-item">
        <img className="table-image small" src={thumbnail} alt="music" />
      </figure>
      <Link to="cart" className="item-btn">
        CART
      </Link>
    </div>
  );
};

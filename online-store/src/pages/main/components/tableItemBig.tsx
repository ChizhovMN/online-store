import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Products } from '../../../types';

export const TableItemBig = ({ thumbnail, group, album, year, format, price, id }: Products) => {
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
        <img className="table-image" src={thumbnail} alt="music" />
        <figcaption className="item-description">{group + ' - ' + album}</figcaption>
      </figure>
      <div>
        <div className="item-year">{year}</div>
        <div className="item-format">{format}</div>
      </div>
      <div className="item-price">{price}$</div>
      <Link to={`/product/${id}`} className="item-btn">
        DETAILS
      </Link>
      <Link to="cart" className="item-btn">
        CART
      </Link>
    </div>
  );
};

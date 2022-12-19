import React from 'react';
import { Products } from '../../../types';
import { Link, Route, Navigate } from 'react-router-dom';
function ShopTable(props: Products[]) {
  const data = Object.values(props);
  return (
    <div className="shop-table">
      {data.map(({ thumbnail, group, album, year, format, price, id }: Products) => {
        return (
          <Link key={id} to="product">
            <div key={id} id={String(id)} className="table-item">
              <figure className="figure-item">
                <img className="table-image" src={thumbnail} alt="music" />
                <figcaption className="item-description">{group + ' ' + album}</figcaption>
              </figure>
              <div>
                <div className="item-year">{year}</div>
                <div className="item-format">{format}</div>
              </div>
              <div className="item-price">{price}</div>
              <button className="item-btn">
                <Link to="product">DETAILS</Link>
              </button>
              <button className="item-btn">
                <Link to="cart">CART</Link>
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export { ShopTable };

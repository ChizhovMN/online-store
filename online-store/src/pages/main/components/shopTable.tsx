import React from 'react';
import { Products } from '../../../types';
function ShopTable(props: Products[]) {
  return (
    <div className="shop-table">
      {props.map(({ thumbnail, group, album, year, format, price, id }: Products) => {
        return (
          <div key={id} className="table-item">
            <figure className="figure-item">
              <img className="table-image" src={thumbnail} alt="music" />
              <figcaption className="item-description">{group + ' ' + album}</figcaption>
            </figure>
            <div>
              <div className="item-year">{year}</div>
              <div className="item-format">{format}</div>
            </div>
            <div className="item-price">{price}</div>
          </div>
        );
      })}
    </div>
  );
}
export { ShopTable };

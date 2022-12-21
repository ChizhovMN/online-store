import React, { useState } from 'react';
import { Products } from '../../../types';
import { Link } from 'react-router-dom';
import { TableItemBig } from './tableItemBig';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import { TableItemSmall } from './tableItemSmall';

const ItemViewType = {
  Large: 'large',
  Small: 'small',
};

const itemViewComponentMapping = {
  [ItemViewType.Large]: TableItemBig,
  [ItemViewType.Small]: TableItemSmall,
};

function ShopTable(props: Products[]) {
  const data = Object.values(props);
  const [itemView, setItemView] = useState(ItemViewType.Large);
  const ItemView = itemViewComponentMapping[itemView] ?? TableItemBig;
  return (
    <div className="shop-table">
      <div className="shop-sort">
        <div className="sort-options">SORT</div>
        <div className="products-found">FOUND</div>
        <div className="search">search</div>
        <ToggleButtonGroup orientation="horizontal" exclusive>
          <ToggleButton
            value="grid"
            aria-label="grid"
            onClick={() => setItemView(ItemViewType.Large)}
          >
            <GridViewSharpIcon />
          </ToggleButton>
          <ToggleButton
            value="module"
            aria-label="module"
            onClick={() => setItemView(ItemViewType.Small)}
          >
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {data.map((item: Products) => (
        <ItemView {...item} key={item.id} />
      ))}
    </div>
  );
}
export { ShopTable };

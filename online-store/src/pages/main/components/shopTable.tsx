import React, { FC, PropsWithChildren, useState } from 'react';
import { Product } from '../../../types';
import { TableItemBig } from './tableItemBig';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import { TableItemSmall } from './tableItemSmall';
import SelectSmall from './selectSort';

const ItemViewType = {
  Large: 'large',
  Small: 'small',
};

const itemViewComponentMapping = {
  [ItemViewType.Large]: TableItemBig,
  [ItemViewType.Small]: TableItemSmall,
};
type ShopTableProps = {
  items: Product[];
};
const ShopTable: FC<PropsWithChildren<ShopTableProps>> = ({ items: products }) => {
  const [itemView, setItemView] = useState(ItemViewType.Large);
  const ItemView = itemViewComponentMapping[itemView] ?? TableItemBig;
  return (
    <div className="shop-table">
      <div className="shop-sort">
        <div className="sort-options">
          <SelectSmall />
        </div>
        <div className="products-found">
          Found: {products.length ? products.length : 0} products
        </div>
        <div className="search">search</div>
        <ToggleButtonGroup orientation="horizontal" exclusive className="size-btn-wrapper">
          <ToggleButton
            value="grid"
            aria-label="grid"
            onClick={() => {
              setItemView(ItemViewType.Large);
            }}
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
      {products.map((item: Product) => (
        <ItemView {...item} key={item.id} />
      ))}
    </div>
  );
};
export { ShopTable };

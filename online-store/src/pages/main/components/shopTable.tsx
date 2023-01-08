import React, { FC, PropsWithChildren } from 'react';
import { ProductType } from '../../../types';
import { TableItemBig } from './tableItemBig';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import { TableItemSmall } from './tableItemSmall';
import SelectSmall from './selectSort';
import SearchField from './searchField';
import { useDispatch, useSelector } from 'react-redux';
import { checkView, selectView } from '../../../store/store';

const ItemViewType = {
  Large: 'large',
  Small: 'small',
};

const itemViewComponentMapping = {
  [ItemViewType.Large]: TableItemBig,
  [ItemViewType.Small]: TableItemSmall,
};
type ShopTableProps = {
  items: ProductType[];
};
const ShopTable: FC<PropsWithChildren<ShopTableProps>> = ({ items: products }) => {
  const dispatch = useDispatch();
  const viewSize = useSelector(selectView);
  const view = ItemViewType.Large === viewSize ? ItemViewType.Large : ItemViewType.Small;
  const ItemView = itemViewComponentMapping[view] ?? TableItemBig;
  return (
    <div className="shop-table">
      <div className="shop-sort">
        <div className="sort-options">
          <SelectSmall />
        </div>
        <div className="products-found">
          Found: {products.length ? products.length : 0} products
        </div>
        <div className="search">
          <SearchField />
        </div>
        <ToggleButtonGroup orientation="horizontal" exclusive className="size-btn-wrapper">
          <ToggleButton
            value="grid"
            aria-label="grid"
            onClick={() => {
              dispatch(checkView('large'));
            }}
          >
            <GridViewSharpIcon />
          </ToggleButton>
          <ToggleButton
            value="module"
            aria-label="module"
            onClick={() => {
              dispatch(checkView('small'));
            }}
          >
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {products.length ? (
        products.map((item: ProductType) => <ItemView {...item} key={item.id} />)
      ) : (
        <div className="not-found"> No products found!</div>
      )}
    </div>
  );
};
export { ShopTable };

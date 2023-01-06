// import * as React from 'react';
import React, { FC, PropsWithChildren } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { products } from '../../../products';
import { RangeSlider } from './dualSliders';
import './sortBox.css';
import { ProductType, RangeMinMax } from '../../../types';
import {
  checkFiltersFormat,
  checkFiltersCategory,
  uniqCategory,
  uniqFormat,
} from '../../../store/store';
import { useDispatch } from 'react-redux';

type SortTableProps = {
  sortItems: ProductType[];
};
const listOfPrices = [...new Set(products.map((item) => item.price))];
const minMaxPrice: RangeMinMax = [Math.min(...listOfPrices), Math.max(...listOfPrices)];
const minMaxYear: RangeMinMax = [Math.min(...listOfPrices), Math.max(...listOfPrices)];
export const CheckboxGenre: FC<PropsWithChildren<SortTableProps>> = ({
  sortItems: sortProducts,
}) => {
  const dispatch = useDispatch();
  const onChange = (el: string) => {
    dispatch(checkFiltersFormat(el));
    dispatch(checkFiltersCategory(el));
  };
  return (
    <div className="sort-box">
      <div className="checkBox-category">
        <div className="genre_head">Genre</div>
        <FormGroup className="checkList">
          {uniqCategory.map((el) => (
            <FormControlLabel
              className="checkLabel"
              key={el}
              control={<Checkbox value={el} />}
              label={el}
              onChange={() => onChange(el)}
            />
          ))}
        </FormGroup>
      </div>
      <FormGroup id="checkBox-format">
        <div className="format_head">Format</div>
        {uniqFormat.map((el) => (
          <FormControlLabel
            className="checkLabel"
            key={el}
            control={<Checkbox value={el} />}
            label={el}
            onChange={() => onChange(el)}
          />
        ))}
      </FormGroup>
      <div className="sliders">
        <RangeSlider
          range={minMaxPrice}
          currencySymbol={'$'}
          filterItemsProperty={sortProducts}
          property={'price'}
        />
        <RangeSlider
          range={minMaxYear}
          currencySymbol={''}
          filterItemsProperty={sortProducts}
          property={'year'}
        />
      </div>
    </div>
  );
};

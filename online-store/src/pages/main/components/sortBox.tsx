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
const listOfYears = [...new Set(products.map((item) => item.year))];

export const minMaxPrice: RangeMinMax = [Math.min(...listOfPrices), Math.max(...listOfPrices)];
export const minMaxYear: RangeMinMax = [Math.min(...listOfYears), Math.max(...listOfYears)];
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
      <FormGroup className="checkBox-format">
        <h3>Format</h3>
        {uniqFormat.map((key) => (
          <FormControlLabel
            key={key}
            control={<Checkbox value={key} />}
            label={key}
            onChange={() => onChange(key)}
          />
        ))}
      </FormGroup>
      <div className="checkBox-category">
        <h3 className="titleGenre">Genre</h3>
        <FormGroup className="checkList">
          {uniqCategory.map((key) => (
            <FormControlLabel
              className="checkLabel"
              key={key}
              control={<Checkbox value={key} />}
              label={key}
              onChange={() => onChange(key)}
            />
          ))}
        </FormGroup>
      </div>
      <div className="sliders">
        <RangeSlider range={minMaxPrice} currencySymbol={'$'} property={'price'} />
        <RangeSlider range={minMaxYear} currencySymbol={''} property={'year'} />
      </div>
    </div>
  );
};

// import * as React from 'react';
import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { products } from '../../../products';
import { RangeSlider } from './dualSliders';
import './sortBox.css';
import { RangeMinMax } from '../../../types';
import {
  checkFiltersFormat,
  checkFiltersCategory,
  uniqCategory,
  uniqFormat,
  selectFilter,
} from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

const listOfPrices = [...new Set(products.map((item) => item.price))];
const listOfYears = [...new Set(products.map((item) => item.year))];

export const minMaxPrice: RangeMinMax = [Math.min(...listOfPrices), Math.max(...listOfPrices)];
export const minMaxYear: RangeMinMax = [Math.min(...listOfYears), Math.max(...listOfYears)];
export const CheckboxGenre = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilter);
  const onChange = (el: string) => {
    dispatch(checkFiltersFormat(el));
    dispatch(checkFiltersCategory(el));
  };
  return (
    <div className="sort-box">
      <div className="checkBox-category">
        <div className="genre_head">Genre</div>
        <FormGroup className="checkList">
          {uniqCategory.map((key) => (
            <FormControlLabel
              className="checkLabel"
              key={key}
              control={<Checkbox value={key} />}
              checked={filters.genre.currentValue.includes(key) ? true : false}
              label={key}
              onChange={() => onChange(key)}
            />
          ))}
        </FormGroup>
      </div>
      <FormGroup id="checkBox-format">
        <div className="format_head">Format</div>
        {uniqFormat.map((key) => (
          <FormControlLabel
            key={key}
            className="checkLabel"
            control={<Checkbox value={key} />}
            checked={filters.format.currentValue.includes(key) ? true : false}
            label={key}
            onChange={() => onChange(key)}
          />
        ))}
      </FormGroup>
      <div className="sliders">
        <RangeSlider range={minMaxPrice} currencySymbol={'$'} property={'price'} />
        <RangeSlider range={minMaxYear} currencySymbol={''} property={'year'} />
      </div>
    </div>
  );
};

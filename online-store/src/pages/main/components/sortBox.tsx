// import * as React from 'react';
import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RangeSlider } from './dualSliders';
import './sortBox.css';
import {
  checkFiltersFormat,
  checkFiltersCategory,
  uniqCategory,
  uniqFormat,
  selectFilter,
  minMaxPrice,
  minMaxYear,
} from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

export const CheckboxGenre = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilter);
  const onChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    dispatch(checkFiltersFormat(target.value));
    dispatch(checkFiltersCategory(target.value));
  };
  return (
    <div className="sort-box">
      <div className="checkBox-category">
        <div className="genre_head">Genre</div>
        <FormGroup className="checkList">
          {uniqCategory.map((key) => (
            <FormControlLabel
              className="checkLabel"
              name="genre"
              key={key}
              control={<Checkbox value={key} />}
              checked={filters.genre.currentValue.includes(key) ? true : false}
              label={key}
              onChange={onChange}
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
            name="format"
            control={<Checkbox value={key} />}
            checked={filters.format.currentValue.includes(key) ? true : false}
            label={key}
            onChange={onChange}
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

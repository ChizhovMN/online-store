// import * as React from 'react';
import React, { useState, FC, PropsWithChildren } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { products } from '../../../products';
import { RangeSlider } from './dualSliders';
import './sortBox.css';
import { Product, RangeMinMax } from '../../../types';

type SortTableProps = {
  sortItems: Product[];
};
const minMaxPrice: RangeMinMax = [
  Math.min(...new Set(products.map((item) => item.price))),
  Math.max(...new Set(products.map((item) => item.price))),
];
const minMaxYear: RangeMinMax = [
  Math.min(...new Set(products.map((item) => item.year))),
  Math.max(...new Set(products.map((item) => item.year))),
];
export const CheckboxGenre: FC<PropsWithChildren<SortTableProps>> = ({
  sortItems: sortProducts,
}) => {
  const [checkBox, setCheckBox] = useState({});
  // const [userinfo, setUserInfo] = useState({
  // genres: [],
  // });
  // const handleChange = (e: { target: { value: unknown; checked: unknown } }) => {
  // Destructuring
  // const { value, checked } = e.target;
  // const { genres } = userinfo;

  // console.log(`${value} is ${checked}`);

  // Case 1 : The user checks the box
  // if (checked) {
  //   setUserInfo({
  //     genres: [...genres, value],
  //   });
  // }
  // Case 2  : The user unchecks the box
  // else {
  // setUserInfo({
  // genres: genres.filter((e) => e !== value),
  // });
  // }
  // };
  const uniqCategory = [...new Set(products.map((item) => item.category))];
  const uniqFormat = [...new Set(products.map((item) => item.format))];

  return (
    <div className="sort-box">
      <FormGroup className="checkBox-format">
        <h3>Format</h3>
        {uniqFormat.map((el) => (
          <FormControlLabel key={el} control={<Checkbox value={el} />} label={el} />
        ))}
      </FormGroup>
      <div className="checkBox-category">
        <h3 className="titleGenre">Genre</h3>
        <FormGroup className="checkList">
          {uniqCategory.map((el) => (
            <FormControlLabel
              className="checkLabel"
              key={el}
              control={<Checkbox value={el} />}
              label={el}
            />
          ))}
        </FormGroup>
      </div>
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

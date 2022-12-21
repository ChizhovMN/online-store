// import * as React from 'react';
import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { products } from '../../../products';
import RangeSlider from './dualSliders';
import './sortBox.css';
export default function CheckboxGenre() {
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
      <FormGroup>
        <h3>Format</h3>
        {uniqFormat.map((el, index) => {
          return (
            <FormControlLabel key={`key${index}`} control={<Checkbox value={el} />} label={el} />
          );
        })}
      </FormGroup>
      <div className="checkBox">
        <h3 className="titleGenre">Genre</h3>
        <FormGroup className="checkList">
          {uniqCategory.map((el, index) => {
            return (
              <FormControlLabel
                className="checkLabel"
                key={`key${index}`}
                control={<Checkbox value={el} />}
                label={el}
              />
            );
          })}
        </FormGroup>
      </div>
      <RangeSlider />
      <RangeSlider />
    </div>
  );
}

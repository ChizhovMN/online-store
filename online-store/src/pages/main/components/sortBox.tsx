// import * as React from 'react';
import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxGenre() {
  const [userinfo, setUserInfo] = useState({
    genres: [],
  });
  const handleChange = (e: { target: { value: unknown; checked: unknown } }) => {
    // Destructuring
    const { value, checked } = e.target;
    const { genres } = userinfo;

    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        genres: [...genres, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        genres: genres.filter((e) => e !== value),
      });
    }
  };

  return (
    <FormGroup>
      <h3>Genre</h3>
      <FormControlLabel
        control={<Checkbox value="Rock" onChange={handleChange} />} 
        label="Rock" />
      <FormControlLabel
        control={<Checkbox value="Metal" onChange={handleChange} />}
        label="Metal"
      />
      <FormControlLabel disabled control={<Checkbox />} label="Punk" />
      <div>{userinfo.genres}</div>
    </FormGroup>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { checkDiscount, selectCart } from '../../store/store';

export default function DiscountField() {
  const dispatch = useDispatch();
  const discountField = useSelector(selectCart).promo;
  const [discount, setDiscount] = React.useState(discountField);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDiscount(event.target.value);
    dispatch(checkDiscount(event.target.value));
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-search"
        label="Enter promo code"
        type="search"
        value={discount}
        onChange={handleChange}
      />
      <div className="promo-text">{`Promo code for test: 'RS' , 'EPM'`}</div>
    </Box>
  );
}

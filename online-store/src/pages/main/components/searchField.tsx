import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { checkSearchField, selectFilter } from '../../../store/store';

export default function SearchField() {
  const dispatch = useDispatch();
  const searchFilter = useSelector(selectFilter);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(checkSearchField(event.target.value));
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
        label="Search product"
        type="search"
        value={searchFilter.search}
        onChange={handleChange}
      />
    </Box>
  );
}

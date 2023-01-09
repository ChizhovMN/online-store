import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setProductsSortOptions } from '../../../store/store';

const directions = ['asc', 'desc'] as const;
const byFields = ['name', 'price'] as const;

const sortOpts = directions.flatMap((direction) => byFields.map((by) => ({ by, direction })));

export default function SelectSmall() {
  const sort = useSelector(selectSort);
  const sortValue = `${sort.by}-${sort.direction}`;
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    const [by, direction] = event.target.value.split('-');
    dispatch(setProductsSortOptions({ by, direction } as typeof sort));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small">Sort Options</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={sortValue}
        label="Sort Options"
        onChange={handleChange}
      >
        <MenuItem key={`none-asc`} value={`none-asc`}>
          None
        </MenuItem>
        {sortOpts.map(({ by, direction }) => (
          <MenuItem
            key={`${by}-${direction}`}
            value={`${by}-${direction}`}
          >{`Sort by ${by} ${direction.toLocaleUpperCase()}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

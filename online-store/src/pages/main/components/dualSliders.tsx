import React, { FC, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ProductType, RangeMinMax } from '../../../types';
import { useDispatch } from 'react-redux';
import { checkPriceSlider, checkSliderYear } from '../../../store/store';
import { minMaxPrice, minMaxYear } from './sortBox';

function valuetext(value: number) {
  return `${value}`;
}
type RangeSliderProps = {
  range: RangeMinMax;
  currencySymbol: string;
  filterItemsProperty: ProductType[];
  property: keyof ProductType;
};
export const RangeSlider: FC<PropsWithChildren<RangeSliderProps>> = ({
  range: minMaxValues,
  currencySymbol,
}) => {
  const [value, setValue] = React.useState<number[]>([minMaxValues[0], minMaxValues[1]]);
  const dispatch = useDispatch();
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if (minMaxPrice[0] <= value[0] && value[1] <= minMaxPrice[1]) {
      dispatch(checkPriceSlider([value[0], value[1]]));
    }
    if (minMaxYear[0] <= value[0] && value[1] <= minMaxYear[1]) {
      dispatch(checkSliderYear([value[0], value[1]]));
    }
  };
  const marks = [
    {
      value: minMaxValues[0],
      label: `${value[0]}${currencySymbol}`,
    },
    {
      value: minMaxValues[1],
      label: `${value[1]}${currencySymbol}`,
    },
  ];
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        step={1}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={minMaxValues[0]}
        max={minMaxValues[1]}
        marks={marks}
      />
    </Box>
  );
};

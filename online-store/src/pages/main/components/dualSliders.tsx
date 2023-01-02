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
    const minMax = newValue as number[];
    if (minMaxPrice[0] <= minMax[0] && minMax[1] <= minMaxPrice[1]) {
      dispatch(checkPriceSlider([minMax[0], minMax[1]]));
    }
    if (minMaxYear[0] <= minMax[0] && minMax[1] <= minMaxYear[1]) {
      dispatch(checkSliderYear([minMax[0], minMax[1]]));
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

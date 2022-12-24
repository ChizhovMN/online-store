import React, { FC, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Product, RangeMinMax } from '../../../types';

function valuetext(value: number) {
  return `${value}`;
}
type RangeSliderProps = {
  range: RangeMinMax;
  currencySymbol: string;
  filterItemsProperty: Product[];
  property: keyof Product;
};
export const RangeSlider: FC<PropsWithChildren<RangeSliderProps>> = ({
  range: minMaxValues,
  currencySymbol,
  filterItemsProperty,
  property,
}) => {
  const [value, setValue] = React.useState<number[]>([minMaxValues[0], minMaxValues[1]]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    const newData = filterItemsProperty.filter(
      (item) => value[0] <= item[property] && item[property] <= value[1]
    );
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

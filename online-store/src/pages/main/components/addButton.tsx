import { Button } from '@mui/material';
import React, { useState, FC, PropsWithChildren } from 'react';

type AddButtonProps = {
  id: number;
};

export const AddButton: FC<PropsWithChildren<AddButtonProps>> = ({ id }) => {
  const [isAdd, setIsAdd] = useState(false);
  return (
    <Button
      size="small"
      color="primary"
      onClick={() => {
        setIsAdd(!isAdd);
      }}
    >
      {isAdd ? 'Drop Cart' : 'Add Cart'}
    </Button>
  );
};

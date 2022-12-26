import { Button } from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateCart, selectCartShopProducts, deleteProductFromCart } from '../../../store/store';

type AddButtonProps = {
  id: number;
  quantity?: number;
};

export const AddButton: FC<PropsWithChildren<AddButtonProps>> = ({ id }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartShopProducts);
  const item = cartItems.find((item) => item.id === id);
  const isAdded = !!item;
  const onClick = (multiplier = 1) => {
    dispatch(
      updateCart({
        productId: id,
        count: multiplier * 1,
      })
    );
  };
  return !isAdded ? (
    <Button size="small" color="primary" onClick={() => onClick()}>
      Add cart
    </Button>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="small" aria-label="small button group">
        <Button size="small" key="plus" onClick={() => onClick()}>
          +
        </Button>
        <Button size="small" key="count" disabled>
          {item.quantity}
        </Button>
        <Button size="small" key="minus" onClick={() => onClick(-1)}>
          -
        </Button>
        <Stack key="delete">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              dispatch(deleteProductFromCart(id));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </ButtonGroup>
    </Box>
  );
};

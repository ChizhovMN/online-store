import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectCartShopProducts } from '../../store/store';
import { useSelector } from 'react-redux';

<Badge
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
/>;
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CustomizedBadges() {
  const cartItems = useSelector(selectCartShopProducts);
  const amountItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={amountItems} color="primary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}

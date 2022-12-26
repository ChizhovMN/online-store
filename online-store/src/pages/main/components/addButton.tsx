import { Button } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../../store/store';

type AddButtonProps = {
  id: number;
  action?: 'add' | 'remove';
  quantity?: number;
};

export const AddButton: FC<PropsWithChildren<AddButtonProps>> = ({
  id,
  quantity = 1,
  action = 'add',
}) => {
  // const isAddToCart = index === -1 ? false : true;
  // const [isAdd, setIsAdd] = useState(isAddToCart);
  const isAdd = action === 'add';
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(updateCart({ productId: id, count: quantity * (isAdd ? 1 : -1) }));
  };
  return (
    <Button size="small" color="primary" onClick={onClick}>
      {!isAdd ? 'Drop Cart' : 'Add Cart'}
    </Button>
  );
};

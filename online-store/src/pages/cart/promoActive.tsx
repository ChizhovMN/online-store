import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDiscount, selectCart } from '../../store/store';
import Button from '@mui/material/Button';

export const PromoActive = () => {
  const dispatch = useDispatch();
  const promo = useSelector(selectCart).discount.current;
  const promoList =
    promo.length > 0 ? (
      <div className="promo">
        Applied codes
        {promo.map((item) => (
          <div key={item.procent} className="promo-active">
            <div className="promo-text">
              {item.name} - {item.procent}%
            </div>
            <Button
              variant="text"
              onClick={() => {
                dispatch(deleteDiscount(item.discount));
              }}
            >
              DROP
            </Button>
          </div>
        ))}
      </div>
    ) : (
      <></>
    );
  return promoList;
};

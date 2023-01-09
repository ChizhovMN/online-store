import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import {
  checkCartPage,
  chunkItemsLength,
  selectCart,
  selectCartShopChunks,
  selectCartTotal,
} from '../../store/store';
import '../cart/cart.css';
import { AddButton } from '../main/components/addButton';
import BasicModal from '../modal';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import DiscountField from './discountField';
import { DiscountAdder } from './addDiscount';
import { PromoActive } from './promoActive';

function Cart() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const cart = useSelector(selectCart);

  const cartItems = useSelector(selectCartShopChunks);
  const click = (num: number, length: number) => {
    if (1 <= cart.page + num && cart.page + num <= length) {
      dispatch(checkCartPage(cart.page + num));
    }
  };
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (Number(newSearchParams.get('page')) < 1) {
      dispatch(checkCartPage(1));
    } else if (Number(newSearchParams.get('page')) > cartItems.length) {
      dispatch(checkCartPage(cartItems.length));
    }
    if (Number(newSearchParams.get('limit')) < 1) {
      dispatch(chunkItemsLength(5));
    }
    if (cart.page > cartItems.length) {
      dispatch(checkCartPage(cartItems.length));
    } else if (cart.page < 1) {
      dispatch(checkCartPage(1));
    }
    newSearchParams.set('limit', String(cart.chunkLength));
    newSearchParams.set('page', String(cart.page));
    if (!cart.entries.length) {
      newSearchParams.delete('page');
      newSearchParams.delete('limit');
    }
    setSearchParams(newSearchParams);
  }, [
    searchParams,
    setSearchParams,
    cartItems.length,
    dispatch,
    cart.entries.length,
    cart.page,
    cart.chunkLength,
  ]);
  useEffect(() => {
    const quryString = window.location.search;
    const startParams = new URLSearchParams(quryString);
    if (startParams.has('page')) {
      dispatch(checkCartPage(Number(startParams.get('page'))));
    }
    if (startParams.has('limit')) {
      dispatch(chunkItemsLength(Number(startParams.get('limit'))));
    }
    setSearchParams(startParams);
  }, [dispatch, setSearchParams]);

  const total = useSelector(selectCartTotal);
  const promo = useSelector(selectCart).discount.current;
  const discount = 1 - promo.reduce((acc, item) => (acc += item.procent), 0) / 100;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      chunkItemsLength(+(event.target.value && event.target.value !== '0' ? event.target.value : 1))
    );
  };
  const currentPage = cartItems[cart.page - 1]
    ? cartItems[cart.page - 1]
    : cartItems[cartItems.length - 1];
  const cartItem =
    cartItems.length > 0 ? (
      <div className="cart-wrapper">
        <div className="cart-table">
          <div className="cart-header">
            <div className="cart-text">Products in cart</div>
            <div className="cart-pagination">
              Limit:
              <input
                type="number"
                name="items"
                className="cart-field"
                min={1}
                step={1}
                value={cart.chunkLength}
                onChange={handleChange}
              />
              Page:
              <KeyboardDoubleArrowLeftIcon
                className="arrow-left arrow"
                onClick={() => click(-1, cartItems.length)}
              />
              <div>{cart.page}</div>
              <KeyboardDoubleArrowRightIcon
                className="arrow-rigth arrow"
                onClick={() => click(1, cartItems.length)}
              />
            </div>
          </div>
          {currentPage.map((item, index) => {
            return (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-link">
                  <div className="cart-count">
                    {index + 1 + (cart.page - 1) * cart.chunkLength}.
                  </div>
                  <img src={item.thumbnail} alt="cart-img" className="cart-image" />
                  <div className="cart-description">
                    <div className="cart-group">{item.group}</div>
                    <div className="cart-album">{item.album}</div>
                    <div className="cart-format">{item.format}</div>
                  </div>
                </Link>
                <div className="cart-btn">
                  <div className="cart-sum">{item.price.toFixed(2)}$</div>
                  <AddButton id={item.id} />
                  <div className="cart-sum">{(item.price * item.quantity).toFixed(2)}$</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="summary">
          Summary
          <div className="cart-count">
            Products: {cartItems.flat().reduce((acc, item) => acc + item.quantity, 0)}
          </div>
          {promo.length > 0 ? (
            <div>
              <div className="cart-total decoration">Total: {total.toFixed(2)}$</div>
              <div className="cart-total">Total:{(total * discount).toFixed(2)}$</div>
            </div>
          ) : (
            <div className="cart-total">Total: {total.toFixed(2)}$</div>
          )}
          <PromoActive />
          <DiscountField />
          <DiscountAdder />
          <BasicModal />
        </div>
      </div>
    ) : (
      <div className="not-found">Cart is empty!</div>
    );
  return <div className="cart">{cartItem}</div>;
}
export { Cart };

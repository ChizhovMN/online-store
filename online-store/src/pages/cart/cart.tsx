import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CartProduct,
  chunkItemsLength,
  selectCart,
  selectCartShopProducts,
  selectCartTotal,
} from '../../store/store';
import '../cart/cart.css';
import { AddButton } from '../main/components/addButton';
import BasicModal from '../main/components/modal';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

function Cart() {
  const length = useSelector(selectCart);
  const [inputValue, setInputValue] = useState(length.chunkLength || 5);
  const [page, setPage] = useState(1);

  const click = (num: number, length: number) => {
    if (1 <= page + num && page + num <= length) {
      setPage(page + num);
    }
  };
  const cartItems = useSelector(selectCartShopProducts).reduce(
    (acc: Array<CartProduct[]>, item, index) => {
      const chunkNumber = Math.floor(index / inputValue);
      if (!acc[chunkNumber]) {
        acc[chunkNumber] = [];
      }
      acc[chunkNumber].push(item);
      return acc;
    },
    []
  );
  console.log('cartItems', cartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
    dispatch(chunkItemsLength(+event.target.value));
  };
  if (page > cartItems.length) {
    setPage(cartItems.length);
  }
  const currentPage = cartItems[page - 1] ? cartItems[page - 1] : cartItems[cartItems.length - 1];
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
                value={inputValue}
                onChange={handleChange}
              />
              Page:
              <KeyboardDoubleArrowLeftIcon
                className="arrow-left arrow"
                onClick={() => click(-1, cartItems.length)}
              />
              <div>{page}</div>
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
                  <div className="cart-count">{index + 1 + (page - 1) * inputValue}.</div>
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
          <div className="cart-total">Total: {total.toFixed(2)}$</div>
          <BasicModal />
        </div>
      </div>
    ) : (
      <div className="not-found">Cart is empty!</div>
    );
  return <div className="cart">{cartItem}</div>;
}
export { Cart };

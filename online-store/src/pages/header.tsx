import React, { FC, PropsWithChildren } from 'react';
import '../styles/header.css';
import logo from '../assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import { CountCart } from './countCart';

export type HeaderProps = {
  children?: React.ReactNode;
  cart: number | string;
};

export const Header: FC<PropsWithChildren<HeaderProps>> = ({ cart }) => {
  console.log(cart);
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <img src={logo} className="logo-image" alt="logo" />
            Disco store
          </Link>
        </div>
        <CountCart cart={cart} />
        <div className="header-cart">
          <Link to="/cart" className="cart">
            cart
          </Link>
        </div>
      </div>
    </header>
  );
};

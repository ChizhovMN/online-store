import React from 'react';
import '../styles/header.css';
import logo from '../assets/icons/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <img src={logo} className="logo-image" alt="logo" />
            Disco store
          </Link>
        </div>
        <div className="header-count">Cart total </div>
        <div className="header-cart">
          <Link to="/cart" className="cart">
            cart
          </Link>
        </div>
      </div>
    </header>
  );
}
export { Header };

import React from 'react';
import '../styles/header.css';
import logo from '../assets/icons/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-logo">
          <a id="main" href="/" className="logo-link">
            <img src={logo} className="logo-image" alt="logo" />
            Disco store
          </a>
        </div>
        <div className="header-count">Cart total </div>
        <div className="header-cart">
          <a id="cart" href="/cart">
            Cart
          </a>
        </div>
      </div>
    </header>
  );
}
export { Header };

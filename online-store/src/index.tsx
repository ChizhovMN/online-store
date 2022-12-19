import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/normalize.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { products } from './products';
console.log(products);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

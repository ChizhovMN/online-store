import React, { useState } from 'react';
import { products } from '../../products';
import { useParams, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import '../product/product.css';
import { AddButton } from '../main/components/addButton';
import { BuyButton } from '../buyButton';

export function Product() {
  const { id } = useParams();
  const currentCard = products.filter((item) => item.id === Number(id));
  console.log('currentcart', currentCard);
  const [urlImg, setUrlImg] = useState(currentCard[0].thumbnail);
  return (
    <>
      <div className="product-path">
        <Link to="/" className="navigate-link">
          Disco store
        </Link>
        <KeyboardDoubleArrowRightIcon />
        <a className="navigate-link">{currentCard[0].format}</a>
        <KeyboardDoubleArrowRightIcon />
        <a className="navigate-link">{currentCard[0].category}</a>
        <KeyboardDoubleArrowRightIcon />
        <a className="navigate-link">{currentCard[0].group}</a>
      </div>
      <div className="product">
        <div className="product-images">
          <img src={urlImg} alt="music-logo" className="main-image" />
          <div className="slider-images">
            {currentCard[0].images.map((item, index) => {
              return (
                <img
                  key={`key${index}`}
                  src={item}
                  alt="music-logo"
                  className="additional-image"
                  onClick={(event) => {
                    if (event.target instanceof Image) {
                      setUrlImg(event.target.src);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="product-description">
          <div className="product-header">
            {currentCard[0].group + ' - ' + currentCard[0].album}
          </div>
          <ol className="product-tracklist">
            {currentCard[0].trackList.map((item, index) => {
              return (
                <li key={`${item}${index}`} className="tracklist-item">
                  {item}
                </li>
              );
            })}
          </ol>
          <div className="product-info">
            <div className="product-year">The year of publishing : {currentCard[0].year}</div>
            <div className="product-janre">Genre : {currentCard[0].category}</div>
            <div className="product-format">Format : {currentCard[0].format}</div>
            <div className="product-price">${currentCard[0].price}</div>
          </div>
          <div className="product-btn">
            <Stack spacing={4} direction="row">
              <BuyButton />
              <AddButton id={Number(id)} />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

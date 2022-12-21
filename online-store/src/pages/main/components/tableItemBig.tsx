import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Products } from '../../../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export const TableItemBig = ({ thumbnail, group, album, year, format, price, id }: Products) => {
  const navigate = useNavigate();
  return (
    // <div
    //   key={id}
    //   className="table-item"
    //   onClick={() => {
    //     navigate(`/product/${id}`);
    //   }}
    // >
    //   <figure className="figure-item">
    //     <img className="table-image" src={thumbnail} alt="music" />
    //     <figcaption className="item-description">{group + ' - ' + album}</figcaption>
    //   </figure>
    //   <div>
    //     <div className="item-year">{year}</div>
    //     <div className="item-format">{format}</div>
    //   </div>
    //   <div className="item-price">{price}$</div>
    //   <Link to={`/product/${id}`} className="item-btn">
    //     DETAILS
    //   </Link>
    //   <Link to="cart" className="item-btn">
    //     CART
    //   </Link>
    // </div>
    <Card className="table-item">
      <CardActionArea
        onClick={() => {
          navigate(`/product/${id}`);
        }}
      >
        <CardMedia
          component="img"
          height="300"
          width="300"
          aspect-ratio="1"
          image={thumbnail}
          alt="music cd/vin"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {album}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {group}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {year + ' ' + format}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}$
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/product/${id}`} className="item-btn">
          DETAILS
        </Link>
        <Link to="cart" className="item-btn">
          CART
        </Link>
        <Button size="small" color="primary">
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export const TableItemSmall = ({ thumbnail, group, album, year, format, price, id }: Product) => {
  const navigate = useNavigate();
  return (
    <Card className="table-item small">
      <CardActionArea
        onClick={() => {
          navigate(`/product/${id}`);
        }}
      >
        <CardMedia
          component="img"
          image={thumbnail}
          height="200"
          width="200"
          aspect-ratio="1"
          alt="music cd/vin"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {group}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
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

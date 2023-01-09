import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { AddButton } from './addButton';

export const TableItemBig = React.memo(
  ({ thumbnail, group, album, year, format, price, id }: ProductType) => {
    const navigate = useNavigate();
    return (
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
        <CardActions className="card-action">
          <Button
            size="small"
            color="primary"
            onClick={() => {
              navigate(`/product/${id}`);
            }}
          >
            DETAILS
          </Button>
          <AddButton id={id} />
        </CardActions>
      </Card>
    );
  }
);

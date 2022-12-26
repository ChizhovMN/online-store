import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { AddButton } from './addButton';

export const TableItemSmall = React.memo(({ thumbnail, group, id }: Product) => {
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
});

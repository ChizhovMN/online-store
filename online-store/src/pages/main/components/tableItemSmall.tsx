import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { AddButton } from './addButton';

export const TableItemSmall = React.memo(({ thumbnail, group, id, album }: ProductType) => {
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
          <Typography gutterBottom variant="h5" component="div">
            {album}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {group}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-action small">
        <AddButton id={id} />
      </CardActions>
    </Card>
  );
});

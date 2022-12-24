import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import { BuyButton } from '../../buyButton';
import { Link, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const func = () => {
    handleOpen();
    navigate('/cart/');
  };

  return (
    <div>
      <Button onClick={func}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Form />
        </Box>
      </Modal>
    </div>
  );
}

class Form extends Component {
  render() {
    return (
      <form>
        <h2>Sign up</h2>
        {/* <div className="form-group"> */}
          {/* <label htmlFor="email">Email address</label> */}
          {/* <input type="email" className="form-control" name="email" /> */}
        {/* </div> */}
      </form>
    );
  }
}

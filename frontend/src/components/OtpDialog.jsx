import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const OtpDialog = ({ open, handleClose }) => {

  const resendCode = () => { console.log("resend otp code"); };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const passcode = formJson.passcode;
            console.log(passcode);
            // send passcode to backend
            // close on success
            // handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To verify your account send passcode you received on your email
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="passcode"
            label="OTP code"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={resendCode}>Resend</Button>
          <Button type="submit">Verify</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OtpDialog;
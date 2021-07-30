import './editUser.css'
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../../context/AuthContext';
import { useState } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(1, 0)
  },
  // color:{
  //   green: theme.palette.text
  // }

}));
export default function EditUserData({ onHide, show }) {
  const classes = useStyles();
  const { user } = useContext(AuthContext)
  // user data
  const [desc, setDesc] = useState(user?.desc)
  const [city, setCity] = useState(user?.city)
  const [from, setFrom] = useState(user?.from)


  const saveNewData = async () => {
    const newUserData = { desc, city, from, userId: user._id }
    const { data } = await axios.put('/users/' + user._id, newUserData)
    console.log(data.message)
    onHide()
  }
  return (
    <div>

      <Dialog open={show}
        onClose={onHide}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can change your profile as you wish.
          </DialogContentText>
          <Box display='flex' flexDirection='column' className={classes.button} >
            <TextField
              id="desc"
              label="Description"
              // helperText="Some important text"
              value={desc}
              className={classes.input}
              onChange={(e) => setDesc(e.target.value)}
            />
            <TextField
              className={classes.input}
              id="city"
              label="Where do you live ?"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              className={classes.input}
              id="from"
              label="Where you from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onHide} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={saveNewData}
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>

        </DialogActions>
      </Dialog>

    </div>
  );
}

import './editUser.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import {
  useState
} from 'react';
import { Box, Fab } from '@material-ui/core';
import { AddPhotoAlternate } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
} from '../../../store-redux/user/user';
import { axiosJWT } from '../../../http';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(1, 0)
  },

}));
export default function EditUserData({ onHide, show }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [desc, setDesc] = useState(user.currentUser?.desc || '')
  const [city, setCity] = useState(user.currentUser?.city || '')
  const [from, setFrom] = useState(user.currentUser?.from || '')
  const [file, setFile] = useState(null)

  const saveNewData = async () => {
    let profPict = user.currentUser?.profilePicture || ''
    if (file) {
      let fileName = Date.now() + file.name
      const data = new FormData()
      data.append('file', file, fileName)
      profPict = fileName
      try {
        await axiosJWT.post('/upload', data)
      } catch (error) {
        console.log(error)
      }
    }
    const newUserData = {
      desc, city, from,
      profilePicture: profPict,
      userId: user.currentUser._id,
    }
    onHide()
    try {
      dispatch(updateUser(newUserData))
    } catch (error) {
      if (error.response?.status === 403) {
        localStorage.clear()
        document.location.reload()
      }
      console.log(error)
    }
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
              label="Where you come from ?"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <AddPhotoAlternate /> Change your avatar
              </Fab>
            </label>
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
            Save
          </Button>

        </DialogActions>
      </Dialog>

    </div>
  );
}

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

// reducer
export const loginCall = createAsyncThunk(
  'user/loginCall',
  async (userCredential, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", userCredential);
      const decode_accessToken = jwt_decode((data).accessToken)
      localStorage.setItem('tokens', JSON.stringify(data))
      localStorage.setItem('user', JSON.stringify(decode_accessToken.user))
      return decode_accessToken.user
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)
// update user's data
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (newUserData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/users/' + newUserData.userId, newUserData);
      localStorage.setItem('user', JSON.stringify(data))
      return data

    } catch (error) {
      console.error('error=>', error.message);
      return rejectWithValue(error.message)
    }
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    pending: null,
    error: false,
  },
  reducers: {
    FOLLOW: (state, action) => { state.currentUser.followings.push(action.payload) },
    UNFOLLOW: (state, action) => { state.currentUser.followings.filter(el => el !== action.payload) },
    TAKENEWDATA: (state) => { state.currentUser = JSON.parse(localStorage.getItem('user')) },
  },
  extraReducers: {
    [loginCall.pending]: state => {
      (state.pending = true)
    },
    [loginCall.fulfilled]: (state, action) => {
      state.currentUser = action.payload
      state.pending = null
      state.error = false
    },
    [loginCall.rejected]: (state, action) => {
      state.error = action.payload
      state.pending = null
    },
    [updateUser.pending]: (state) => {
      state.pending = true
    },
    [updateUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload
      state.pending = null
      state.error = false
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.payload
      state.pending = null
    },
  }
})

export const { FOLLOW, UNFOLLOW, UPDATE_USER, TAKENEWDATA } = userSlice.actions
export default userSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch
export const viewUserFetch = createAsyncThunk('getviewUser/fetch',
  async (username) => {
    const { data } = await axios.get('/users?username=' + username)
    return data
  })

// 
export const viewUserSlice = createSlice({
  name: 'viewUser',
  initialState: {
    viewUser: null,
    error: null
  },
  reducers: {},
  extraReducers: {
    [viewUserFetch.fulfilled]: (state, action) => { state.viewUser = action.payload },
    [viewUserFetch.rejected]: (state, action) => { state.error = action.payload }
  }
})



export default viewUserSlice.reducer
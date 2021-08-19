import { $host } from "../../http";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getConversations = createAsyncThunk('conversation/getCurrentUser',
  async (userId) => {
    const { data } = await $host.get('/conversations/' + userId+'/friends');
    return data
  })


export const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    conversations: null,
    loading: false,
    new: false,
    continue: false,
    error: false
  },
  reducers: {},
  extraReducers: {
    [getConversations.fulfilled]: (state, actions) => { state.conversations = actions.payload },
    [getConversations.rejected]: (state, actions) => { state.conversations = actions.payload }
  }
})

export const { startFetch } = conversationSlice.actions
export default conversationSlice.reducer

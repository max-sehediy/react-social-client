import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from './conversation/conversationStore'
import userReducer from './user/user'
import viewUserReducer from './viewUser/viewUserStore'


export default configureStore({
  reducer: {
    conversation: conversationReducer,
    user: userReducer,
    viewUser: viewUserReducer
  }
})
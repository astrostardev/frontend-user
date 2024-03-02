import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({

    name:'conversation',
    initialState:{
        isAuthenticated: false,
        messages:[],
        loading:false
    },
   reducers:{
    getChatRequest(state, action) {
        return {
            ...state,
            loading: true,
        }
    },
    getChatSuccess(state, action) {
        return {
            loading: false,
            isAuthenticated: true,
            chat: action.payload.messages,
        }
    },
    getChatFail(state, action) {
        console.log("Error in login:", action.payload);
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    },
   }
})

const {actions,reducer} =  conversationSlice ;

export const {
 getChatRequest,
 getChatFail,
 getChatSuccess
} = actions;
export default reducer

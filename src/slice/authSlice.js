import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isAuthenticated: false,
        token:null
    },
    reducers: {
        loginRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token:action.payload.token
            }
        },
        loginFail(state, action) {
            console.log("Error in login:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        registerSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                // token:action.payload.token
            }
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        logoutSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: false,
            }
        },
        logoutFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        callDurationRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        callDurationSuccess(state,action){
            return {
                ...state,
                loading:false,
                isAuthenticated: true,
                user: action.payload.user,
            }
        },
        callDurationFail(state,action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        postRechargeRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        postRechargeSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token:action.payload.token
            }
        },
        postRechargeFail(state, action) {
            console.log("Error in login:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
}

});

const { actions, reducer } = authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    logoutSuccess,
    logoutFail,
    callDurationFail,
    callDurationRequest,
    callDurationSuccess,
    postRechargeRequest,
    postRechargeFail,
    postRechargeSuccess
} = actions;
export default reducer
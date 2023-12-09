import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './slice/authSlice.js'

const reducer = combineReducers({
   authState:authReducer
})

const store = configureStore({
    reducer,
    middleware:[thunk]
})
export default store;
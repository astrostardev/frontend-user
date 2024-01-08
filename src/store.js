import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './slice/authSlice.js'
import packageReducer from './slice/packageSlice.js'


const reducer = combineReducers({
   authState:authReducer,
   packageState:packageReducer

})

const store = configureStore({
    reducer,
    middleware:[thunk]
})
export default store;
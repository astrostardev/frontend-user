import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './Slice/authSlice.js';
import packageReducer from './Slice/packageSlice.js';
import astrologerReducer from './Slice/astrologerSlice.js';
import timerReducer from './Slice/timerSlice.js'
import conversationReducer from './Slice/conversationSlice.js';

const reducer = combineReducers({
   authState: authReducer, 
   packageState: packageReducer,
   astroState: astrologerReducer, 
   conversationState: conversationReducer,
   timerState: timerReducer
});

const store = configureStore({
    reducer,
    middleware: [thunk]
});

export default store;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './slice/authSlice.js';
import packageReducer from './slice/packageSlice.js';
import astrologerReducer from './slice/astrologerSlice.js';
import timerReducer from './slice/timerSlice.js'
import conversationReducer from './slice/conversationSlice.js';

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

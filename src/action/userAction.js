import {
    loginRequest,
    loginFail,
    loginSuccess,
    clearError,
    registerSuccess,
    registerFail,
    registerRequest,
    logoutFail,
    logoutSuccess,
    callDurationFail,
    callDurationRequest,
    callDurationSuccess
} from '../slice/authSlice'
import { toast } from 'react-toastify'
import axios from 'axios'

export const login = (phoneNo) => async (dispatch, getState) => {
    try {
      dispatch(loginRequest());
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/login`, { phoneNo });
      const {data} = response;
      console.log(data);
      dispatch(loginSuccess(data));
      console.log(response.status);
    } catch (error) {
  if (error.response === 404) {
    toast.error("User not registered. Please register");
  }
      dispatch(loginFail(error?.response?.data?.message));
      console.error(error.response?.data?.message);
    }
  };
export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const userRegister = (phoneNo, name) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/register`, { phoneNo, name });
    const {data} = response;
    console.log(data);
    dispatch(registerSuccess(data));

  }
  catch(error){
    if (error.response && error.response.status === 409) {
      toast.error("User already registered. Please login");
    }
    dispatch(registerFail(error?.response?.data?.message));
    console.error(error.response?.data?.message);
  }
  
};
export const userCall = (id,recordedTime) => async (dispatch) => {

  try {
      dispatch(callDurationRequest())
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/callDuration`, {id,recordedTime});
      dispatch(callDurationSuccess(data))
  } catch (error) {
      dispatch(callDurationFail(error.response.data.message))
  }

}



export const logout =  async (dispatch) => {

    try {
        const {data} = await axios.get(`${process.env.REACT_APP_URL}/api/v1/user/logout`)
        dispatch(logoutSuccess(data))
    } catch (error) {
        dispatch(logoutFail())
    }

}

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
    callDurationSuccess,
    postRechargeRequest,
    postRechargeSuccess,
    postRechargeFail,
    setErrorMessage,

} from '../slice/authSlice'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useSelector } from 'react-redux';

// export const setErrorMessage = (errorMessage) => ({payload: errorMessage });

export const login = (phoneNo,token) => async (dispatch, getState) => {
    try {
      dispatch(loginRequest());
  
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/login`,{ phoneNo });
      const {data} = response;
      console.log(data);
      dispatch(loginSuccess(data));
      console.log(response.status);
    } catch (error) {
      let errorMessage = error?.response?.data?.message || 'An error occurred during login';

      if (error.response && error.response.status === 404) {
        errorMessage = "User not registered. Please register";
        // Dispatch the action to store the error message
        dispatch(setErrorMessage(errorMessage));
      }
  // if (error.response === 404) {
  //   toast.error("User not registered. Please register");
  // }
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
    // if (error.response && error.response.status === 409) {
    //   toast.error("User already registered. Please login");
    // }
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
export const userRecharge = (userid,packages) => async (dispatch) => {

  try {
      dispatch(postRechargeRequest())
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/recharge/${userid}`,packages);
     
      console.log('After axios.post'); dispatch(postRechargeSuccess(data))

  } catch (error) {
      dispatch(postRechargeFail(error.response.data.message))
      console.log(error);
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
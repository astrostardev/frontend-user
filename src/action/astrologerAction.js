import { getAllAstrologerFail, getAllAstrologerRequest, getAllAstrologerSuccess, isAstrologerBusyFail, isAstrologerBusyRequest, isAstrologerBusySuccess } from "../slice/astrologerSlice";
import axios from 'axios'

export const isAstrologerBusy = ( isBusy, id, token) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
  
      dispatch(isAstrologerBusyRequest());
  
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/astrologer/isBusy`,
        {  isBusy, id },
        config
      );
  
      console.log('After axios.post');
      dispatch(isAstrologerBusySuccess(data));
    } catch (error) {
      dispatch(isAstrologerBusyFail(error?.response?.data?.message));
      console.error(error);
    }
  };
  export const getAllAstrologer= (token) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      dispatch(getAllAstrologerRequest());
  
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/astrologer/allAstrologers`,
        config
      );
      console.log("Data fetched:", data);
  
      dispatch(getAllAstrologerSuccess(data));
    } catch (error) {
      dispatch(getAllAstrologerFail(error.response.data.message));
      console.error(error);
    }
  };
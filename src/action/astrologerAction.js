import {
  availAstrologerCallFail,
  availAstrologerCallRequest,
  availAstrologerCallSuccess,
  availAstrologerChatFail,
  availAstrologerChatRequest,
  availAstrologerChatSuccess,
  getAllAstrologerFail,
  getAllAstrologerRequest,
  getAllAstrologerSuccess,
  isAstrologerBusyFail,
  isAstrologerBusyRequest,
  isAstrologerBusySuccess,
} from "../Slice/astrologerSlice";
import axios from "axios";

export const isAstrologerBusy = (isBusy, id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(isAstrologerBusyRequest());

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/v1/astrologer/isBusy`,
      { isBusy, id },
      config
    );

    console.log("After axios.post");
    dispatch(isAstrologerBusySuccess(data));
  } catch (error) {
    dispatch(isAstrologerBusyFail(error?.response?.data?.message));
    console.error(error);
  }
};
export const getAllAstrologer = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`
      },
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
export const getAstrologerAvailableForCall = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(availAstrologerCallRequest());

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/astrologer/call_available`,
      config
    );
    console.log("Data fetched:", data);

    dispatch(availAstrologerCallSuccess(data));
  } catch (error) {
    dispatch(availAstrologerCallFail(error.response.data.message));
    console.error(error);
  }
};
export const getAstrologerAvailableForChat = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(availAstrologerChatRequest());

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/astrologer/chat_available`,
      config
    );
    console.log("Data fetched:", data);

    dispatch(availAstrologerChatSuccess(data));
  } catch (error) {
    dispatch(availAstrologerChatFail(error.response.data.message));
    console.error(error);
  }
};

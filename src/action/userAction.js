import {
  sendChatDetailToAStrologerFail,
  sendChatDetailToAStrologerRequest,
  sendChatDetailToAStrologerSuccess,
} from "../Slice/astrologerSlice";
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
  getAllUserRequest,
  getAllUserSuccess,
  getAllUserFail,
  getBalAfterChatRequest,
  getBalAfterChatSuccess,
  getBalAfterChatFail,
} from "../Slice/authSlice";
import axios from "axios";

// export const setErrorMessage = (errorMessage) => ({payload: errorMessage });

export const login = (phoneNo) => async (dispatch, getState) => {
  try {
    dispatch(loginRequest());

    const response = await axios.post(
      `${process.env.REACT_APP_URL}/api/v1/user/login`,
      { phoneNo }
    );

    const { data } = response;
    console.log(data);
    dispatch(loginSuccess(data));
    console.log(response.status);
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message || "An error occurred during login";

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
export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const userRegister =
  (phoneNo, name, userID, referralCode, welcomeBonus, welcomerefBonus) =>
  async (dispatch) => {
    try {
      dispatch(registerRequest());
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/user/register`,
        { phoneNo, name, userID, referralCode, welcomeBonus, welcomerefBonus }
      );
      const { data } = response;
      console.log(data);
      dispatch(registerSuccess(data));
    } catch (error) {
      // if (error.response && error.response.status === 409) {
      //   toast.error("User already registered. Please login");
      // }
      dispatch(registerFail(error?.response?.data?.messag));
      console.error(error.response?.data?.message);
    }
  };
export const getAllUser = async (dispatch) => {
  try {
    dispatch(getAllUserRequest());
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/user/users`
    );
    const { data } = response;
    console.log(data);
    dispatch(getAllUserSuccess(data));
  } catch (error) {
    // if (error.response && error.response.status === 409) {
    //   toast.error("User already registered. Please login");
    // }
    dispatch(getAllUserFail(error?.response?.data?.messag));
    console.error(error.response?.data?.message);
  }
};
export const userCall = (id, recordedTime) => async (dispatch) => {
  try {
    dispatch(callDurationRequest());
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/v1/user/callDuration`,
      { id, recordedTime }
    );
    dispatch(callDurationSuccess(data));
  } catch (error) {
    dispatch(callDurationFail(error.response.data.message));
  }
};
export const userRecharge = (userid, packages) => async (dispatch) => {
  try {
    dispatch(postRechargeRequest());
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/v1/user/recharge/${userid}`,
      packages
    );

    console.log("After axios.post");
    dispatch(postRechargeSuccess(data));
  } catch (error) {
    dispatch(postRechargeFail(error.response.data.message));
    console.log(error);
  }
};
export const getBalanceAfterChat =
  (astrologer, astroId, date, chatTime, spentAmount, id, token) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      dispatch(getBalAfterChatRequest());

      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/user/balance_after_chat`,
        { astrologer, astroId, date, chatTime, spentAmount, id },
        config
      );

      console.log("After axios.post");
      dispatch(getBalAfterChatSuccess(data));
    } catch (error) {
      dispatch(getBalAfterChatFail(error.response.data.message));
      console.error(error);
    }
  };

export const saveChatDetails = (id, spendAmount, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(getBalAfterChatRequest());

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/v1/user/chat/history`,
      { id, spendAmount },
      config
    );

    console.log("After axios.post");
    dispatch(getBalAfterChatSuccess(data));
  } catch (error) {
    dispatch(getBalAfterChatFail(error.response.data.message));
    console.error(error);
  }
};
export const saveChatDetailsToAstrologerDb =
  (name, userId, date, chatTime, earnedAmount, id, token) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      dispatch(sendChatDetailToAStrologerRequest());

      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/astrologer/chatDetail`,
        {
          name,
          userId,
          date,
          chatTime,
          earnedAmount,
          id,
          token,
        },
        config
      );

      console.log("After axios.post");
      dispatch(sendChatDetailToAStrologerSuccess(data));
    } catch (error) {
      dispatch(sendChatDetailToAStrologerFail(error.response.data.message));
      console.error(error);
    }
  };

export const logout = async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/user/logout`
    );
    dispatch(logoutSuccess(data));
  } catch (error) {
    dispatch(logoutFail());
  }
};

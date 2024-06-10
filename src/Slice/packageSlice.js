import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    loading: false,
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    packageRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    packageSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        packages: action.payload.packages,
      };
    },
    packageFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    singlePackageRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    singlePackageSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        singlePackage:action.payload.singlePackage,
      };
    },
    singlePackageFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    },
    rechargeRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    rechargeSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        updatedPackage:action.payload.updatedPackage,
      };
    },
    rechargeFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    }
  },
});
const { actions, reducer } = packageSlice;
export const { packageRequest, packageFail, packageSuccess, singlePackageRequest, singlePackageSuccess, singlePackageFail, rechargeFail,rechargeRequest,rechargeSuccess} = actions;
export default reducer;

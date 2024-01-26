import { packageFail,packageRequest,packageSuccess, singlePackageFail, singlePackageRequest, singlePackageSuccess,rechargeFail,rechargeRequest,rechargeSuccess } from "../slice/packageSlice";
import axios from 'axios'
export const showPackages = () => async (dispatch) => {

    try {
        dispatch(packageRequest())
      
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/package/show`);
        dispatch(packageSuccess(data))
        // console.log('data',data);
    } catch (error) {
        dispatch(packageFail(error.response.data.message))
    }
  
  }
  export const getRechargePackage = (id) => async (dispatch) => {

    try {
        dispatch(rechargeRequest())
      
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/package/getPackage/${id}`);
        dispatch(rechargeSuccess(data))
        // console.log('rechargedata',data);
    } catch (error) {
        dispatch(rechargeFail(error.response.data.message))
    }
  
  }
  export const getPackage = (id) => async (dispatch) => {

    try {
        dispatch(singlePackageRequest())
      
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/package/getPackage/${id}`);
        dispatch(singlePackageSuccess(data))
        // console.log('data',data);
    } catch (error) {
        dispatch(singlePackageFail(error.response.data.message))
    }
  
  }
import axios from 'axios'
import { getChatFail, getChatRequest, getChatSuccess } from '../slice/conversationSlice';
export const showPackages = (token,splitId) => async (dispatch) => {

    try {
        dispatch(getChatRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        console.log('token',token);
        const { data } = await axios.get( `${process.env.REACT_APP_URL}/api/v1/user_messages/${splitId}`,config);
        dispatch(getChatSuccess(data))
        // console.log('data',data);
    } catch (error) {
        dispatch(getChatFail(error.response.data.message))
    }
  
  }
import {LOGIN_SUCCESS,LOGIN_FAILURE} from '../actionTypes'
import Axios from 'axios'
const loginURL = process.env.LOGIN_URL ?? `http://localhost:9001/auth/login`
export const login = (loginId,loginPassword) => {
    return async(dispatch) => {
        try{            
            Axios.post(loginURL,{
                loginId : loginId,
                loginPassword : loginPassword
            })
            .then(response => {
                
                if(response.data.error_state === false){                    
                    dispatch({
                        type:LOGIN_SUCCESS,
                        payload:response.data.data
                    })
                }
                else{                    
                    dispatch({
                        type:LOGIN_FAILURE,
                        payload: response.data.error
                    })
                }
                
            })
        }
        catch(error){
            dispatch({
                type : LOGIN_FAILURE,
                payload : error.message
            })
        }
    }
}


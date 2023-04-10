import { json } from 'body-parser';
import {LOGIN_FAILURE,LOGIN_SUCCESS,LOGOUT} from '../actionTypes'
const loginState = localStorage.getItem('loginState') ?? JSON.stringify({isLoggedIn: false,user: null,error: null,});
const initialState = JSON.parse(loginState)
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        localStorage.setItem('loginState',JSON.stringify({isLoggedIn: true,user: action.payload,error: null,}))
        return {
          isLoggedIn: true,
          user: action.payload,
          error: null,
        };
      case LOGIN_FAILURE:
        localStorage.setItem('loginState',JSON.stringify({isLoggedIn: false,user:null,error: action.payload,}))        
        return {
          isLoggedIn: false,
          user: null,
          error: action.payload,
        };
      case LOGOUT:
        localStorage.setItem('loginState',JSON.stringify({isLoggedIn: false,user: null,error: null,}))        
        return {isLoggedIn: false,user: null,error: null,};
      default:
        return state;
    }
};
export default loginReducer
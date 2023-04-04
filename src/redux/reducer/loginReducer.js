import {LOGIN_FAILURE,LOGIN_SUCCESS,LOGOUT} from '../actionTypes'
const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
};
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          isLoggedIn: true,
          user: action.payload,
          error: null,
        };
      case LOGIN_FAILURE:        
        return {
          isLoggedIn: false,
          user: null,
          error: action.payload,
        };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
};
export default loginReducer
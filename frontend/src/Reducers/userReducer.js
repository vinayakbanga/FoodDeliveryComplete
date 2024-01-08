import { act } from "react-dom/test-utils";
import { LOGIN_REQUEST,
   LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_FAIL,LOGOUT_SUCCESS,
  UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_RESET


   } from "../Constants/userConstant";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  users: [], // You had this in your initial state, but it seems unnecessary
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null, // Clear any previous errors on successful login
      };
      
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      case LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
        case LOGOUT_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileReducer = (state={ },action)=>{
  switch(action.type){
    case UPDATE_PROFILE_REQUEST:
      return{
        ...state,
        loading:true,

      }
      case UPDATE_PROFILE_SUCCESS:
        return{
          ...state,
          
          isUpdated:action.payload,
        }

      case UPDATE_PROFILE_FAIL:
        return{
          ...state,
          error:action.payload
        }

        case UPDATE_PROFILE_RESET:
          return {
            ...state,
            isUpdated:false
          }
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
    
        default:
          return state;
      
  }
}
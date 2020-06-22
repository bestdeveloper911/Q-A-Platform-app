import { AUTH_FAIL, ACTIVITY_FAIL, AUTH_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT, SUBCRIBE_SUCCESS } from "../types";

const initial_state = {
  user: null,
  register: false,
  islogin: false,
  error: false,
  activity: false,
  existerror : false,
  validerror: false,
  subscribe: false
}

export default (state = initial_state, action) => {
  console.log('action', action.payload)
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, user: action.payload, islogin: true, activity: true, register:false }
    case LOGOUT:
        return initial_state
    case REGISTER_SUCCESS: 
      return {...state, user: action.payload, register: true, islogin: false}
    // case AUTH_EXIST_FAIL:
    //   return {...state, existerror: true}
    // case AUTH_VALID_FAIL:
    //   return {...state, validerror: true}
    case AUTH_FAIL: 
      return {...state, error: true, activity: false, register: false, user: null, islogin: false,}
    case ACTIVITY_FAIL: 
      return {...state, user: action.payload, activity: false, error: false, register: false}
    case SUBCRIBE_SUCCESS: 
      return {...state, subscribe: true}
    case REGISTER_FAIL: 
      return {...state, error: true, activity: false, register: false, user: null}
    case LOGOUT:
      return initial_state
    default:
      return state;
  }
}
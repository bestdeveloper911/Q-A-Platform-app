
import { registerUser, loginUser } from "../../service/auth";
import { START_OVERLAY_LOADING, STOP_OVERLAY_LOADING, AUTH_SUCCESS,AUTH_FAIL, ACTIVITY_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from "../types";
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';


export const onRegister = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch({ type: START_OVERLAY_LOADING })
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async(res) => {
        registerUser(name, email, password, res.user._user.uid);
        let uid = res.user._user.uid;
        let userrole = global.user;
        dispatch({ type: STOP_OVERLAY_LOADING });
        dispatch({type:REGISTER_SUCCESS, payload: {email, password, userrole, uid}})
      })
      .catch(error => {
        dispatch({ type: STOP_OVERLAY_LOADING });
        dispatch({type:REGISTER_FAIL});
        Toast.show('Register Failed.')
          // if (error.code === 'auth/email-already-in-use') {
          //   dispatch({ type: STOP_OVERLAY_LOADING });
          // console.log('That email address is already in use!');
          // }

          // if (error.code === 'auth/invalid-email') {
          //   dispatch({ type: STOP_OVERLAY_LOADING });
          // console.log('That email address is invalid!');
          // }
      });
  }
}

export const onLogin = ({email, password}) => {
  return async (dispatch) => {
    dispatch({type: START_OVERLAY_LOADING})
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async(res) => {
        const response = await loginUser(email, res.user._user.uid);
        dispatch({ type: STOP_OVERLAY_LOADING });
        if (response != undefined){
          let userrole = response.userrole;
          let uid = res.user._user.uid
          if (response.userrole == 1){
            if (response.status == 'accepted'){
              dispatch({type:AUTH_SUCCESS, payload: {email, userrole, uid}})
            } else{
            dispatch({type:ACTIVITY_FAIL, payload: {email, userrole, uid}})
            }
          } else {
            dispatch({type:AUTH_SUCCESS, payload: {email, userrole, uid}})
          }
        }
      })
      .catch(error => {
        dispatch({ type: STOP_OVERLAY_LOADING });
        dispatch({type:AUTH_FAIL})
          // if (error.code === 'auth/email-already-in-use') {
          //   dispatch({type:AUTH_EXIST_FAIL})
          //   console.log('That email address is already in use!');
          // }
          // if (error.code === 'auth/invalid-email') {
          //   dispatch({type:AUTH_VALID_FAIL})
          // console.log('That email address is invalid!');
          // }

          // console.error(error);
      });
  }
}


export const logOut = () => {
  return async(dispatch) => {
    dispatch({type: LOGOUT})
  }
}
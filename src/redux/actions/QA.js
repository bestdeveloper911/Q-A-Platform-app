
import {subscribe} from "../../service/QA";
import { START_OVERLAY_LOADING, STOP_OVERLAY_LOADING, SUBCRIBE_SUCCESS } from "../types";
import auth from '@react-native-firebase/auth';


export const onSubscribe = (status, uid) => {
  return async (dispatch) =>{
    dispatch({ type: START_OVERLAY_LOADING })
    await subscribe(status,uid);
    dispatch({ type: STOP_OVERLAY_LOADING });
    dispatch({type:SUBCRIBE_SUCCESS})
  }
}


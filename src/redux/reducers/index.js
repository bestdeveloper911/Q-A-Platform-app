import { combineReducers } from "redux";
import AuthReducer from  './Auth'
import LoadingReducer from './Loading';
import QAReducer from './QA';
import {loader} from './HOCreducers';

export default combineReducers({
    auth: AuthReducer,
    loading: LoadingReducer,
    QA:QAReducer,
    loader
});
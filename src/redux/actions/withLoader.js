import { connect } from "react-redux";
import { loaderSet } from "./actions";
import {STOP_OVERLAY_LOADING} from "../types";
const mapDispatchToProps = dispatch => ({
    loaderSP: state => {
        dispatch(loaderSet(state));
    },
    loadingSP: () => {
        dispatch({ type: STOP_OVERLAY_LOADING });
    }
});

const mapStateToProps = state => ({
    loaderState: state.loader ? state.loader : false
});

export default connect(mapStateToProps,mapDispatchToProps);

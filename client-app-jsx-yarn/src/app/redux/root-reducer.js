import {combineReducers} from "redux";

import activityReducer from "./activities/activity.reducer";


const rootReducer = combineReducers({
    activityDashboard: activityReducer
});

export default rootReducer;

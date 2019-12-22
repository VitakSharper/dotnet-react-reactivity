import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import activityReducer from "./activities/activity.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['activityDashboard']
};

const rootReducer = combineReducers({
    activityDashboard: activityReducer
});

export default persistReducer(persistConfig, rootReducer);

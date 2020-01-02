import ActivityActionTypes from "./activity.types";
import {setSelectedActivity} from "./activity.utils";

const INITIAL_STATE = {
    activities: null,
    selectedActivity: null,
    isFetching: false,
    errorMessage: undefined,
    editMode: false
};

const activityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActivityActionTypes.SET_SELECTED_ACTIVITY:
            return {
                ...state,
                selectedActivity: setSelectedActivity(action.payload, state.activities)
            };
        case ActivityActionTypes.SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.payload
            };
        case ActivityActionTypes.FETCH_ACTIVITIES_START:
            return {
                ...state,
                isFetching: true
            };
        case ActivityActionTypes.FETCH_ACTIVITIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                activities: action.payload.map(a => {
                    a.date = a.date.split('.')[0];
                    return a;
                })
            };
        case ActivityActionTypes.FETCH_ACTIVITIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default activityReducer;

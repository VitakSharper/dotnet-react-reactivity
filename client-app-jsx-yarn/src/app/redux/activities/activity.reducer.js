import ActivityActionTypes from "./activity.types";
import {setSelectedActivity, editExistingActivity} from "./activity.utils";

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
                activities: action.payload
            };
        case ActivityActionTypes.FETCH_ACTIVITIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        case ActivityActionTypes.EDIT_EXISTING_ACTIVITY:
            return {
                ...state,
                activities: editExistingActivity(action.payload, state.activities)
            };
        default:
            return state;
    }
};

export default activityReducer;

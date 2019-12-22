import ActivityActionTypes from "./activity.types";

const INITIAL_STATE = {
    activities: [],
    selectedActivity: null,
    isFetching: false,
    errorMessage: undefined
};

const activityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActivityActionTypes.SET_SELECTED_ACTIVITY:
            return {
                ...state,
                selectedActivity: action.payload
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
        default:
            return state;
    }
};

export default activityReducer;

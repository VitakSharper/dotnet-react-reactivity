import ActivityActionTypes from "./activity.types";

const INITIAL_STATE = {
    activities: [],
    selectedActivity: null
};

const activityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActivityActionTypes.SET_SELECTED_ACTIVITY:
            return {
                ...state,
                selectedActivity: action.payload
            };

        default:
            return state;
    }
};

export default activityReducer;

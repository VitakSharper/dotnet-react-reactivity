import ActivityActionTypes from "./activity.types";
import {setSelectedActivity, editExistingActivity, addActivity, removeExistingActivity} from "./activity.utils";

const INITIAL_STATE = {
    activities: null,
    selectedActivity: null,
    submitting: false,
    errorMessage: undefined,
    editMode: false,
    btnTarget: ''
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

        case ActivityActionTypes.REMOVE_EXISTING_ACTIVITY_START:
        case ActivityActionTypes.EDIT_EXISTING_ACTIVITY_START:
        case ActivityActionTypes.ADD_ACTIVITY_START:
        case ActivityActionTypes.FETCH_ACTIVITIES_START:
            return {
                ...state,
                submitting: true
            };

        case ActivityActionTypes.FETCH_ACTIVITIES_SUCCESS:
            return {
                ...state,
                submitting: false,
                editMode: false,
                selectedActivity: null,
                btnTarget: '',
                activities: action.payload
            };

        case ActivityActionTypes.EDIT_EXISTING_ACTIVITY_SUCCESS:
            return {
                ...state,
                submitting: false,
                selectedActivity: setSelectedActivity(action.payload.id, state.activities),
                activities: editExistingActivity(action.payload, state.activities)
            };

        case ActivityActionTypes.ADD_ACTIVITY_SUCCESS:
            return {
                ...state,
                submitting: false,
                selectedActivity: setSelectedActivity(action.payload.id, state.activities),
                activities: addActivity(action.payload, state.activities)
            };

        case ActivityActionTypes.REMOVE_EXISTING_ACTIVITY_SUCCESS:
            return {
                ...state,
                submitting: false,
                btnTarget: action.payload,
                activities: removeExistingActivity(action.payload, state.activities)
            };

        case ActivityActionTypes.FETCH_FAILURE:
            return {
                ...state,
                submitting: false,
                errorMessage: action.payload
            };

        default:
            return state;
    }
};

export default activityReducer;

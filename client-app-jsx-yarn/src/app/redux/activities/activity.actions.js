import ActivityActionTypes from "./activity.types";

export const setSelectedActivity = activityId => ({
    type: ActivityActionTypes.SET_SELECTED_ACTIVITY,
    payload: activityId
});

export const setEditMode = (mode) => ({
    type: ActivityActionTypes.SET_EDIT_MODE,
    payload: mode
});

export const fetchActivitiesStart = () => ({
    type: ActivityActionTypes.FETCH_ACTIVITIES_START
});

export const fetchActivitiesSuccess = activities => ({
    type: ActivityActionTypes.FETCH_ACTIVITIES_SUCCESS,
    payload: activities
});

export const fetchActivitiesError = error => ({
    type: ActivityActionTypes.FETCH_ACTIVITIES_FAILURE,
    payload: error
});

export const editExistingActivity = activity => ({
    type: ActivityActionTypes.EDIT_EXISTING_ACTIVITY,
    payload: activity
});

export const addActivity = activity => ({
    type: ActivityActionTypes.ADD_ACTIVITY,
    payload: activity
});

export const removeExistingActivity = activityId => ({
    type: ActivityActionTypes.REMOVE_EXISTING_ACTIVITY,
    payload: activityId
});

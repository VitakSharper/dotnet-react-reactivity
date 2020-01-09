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


export const addActivityStart = (activity) => ({
    type: ActivityActionTypes.ADD_ACTIVITY_START,
    payload: activity
});
export const addActivitySuccess = activity => ({
    type: ActivityActionTypes.ADD_ACTIVITY_SUCCESS,
    payload: activity
});


export const editExistingActivityStart = (activity) => ({
    type: ActivityActionTypes.EDIT_EXISTING_ACTIVITY_START,
    payload: activity
});
export const editExistingActivitySuccess = activity => ({
    type: ActivityActionTypes.EDIT_EXISTING_ACTIVITY_SUCCESS,
    payload: activity
});


export const removeExistingActivityStart = (activityId) => ({
    type: ActivityActionTypes.REMOVE_EXISTING_ACTIVITY_START,
    payload: activityId
});
export const removeExistingActivitySuccess = activityId => ({
    type: ActivityActionTypes.REMOVE_EXISTING_ACTIVITY_SUCCESS,
    payload: activityId
});

export const failure = error => ({
    type: ActivityActionTypes.FETCH_FAILURE,
    payload: error
});

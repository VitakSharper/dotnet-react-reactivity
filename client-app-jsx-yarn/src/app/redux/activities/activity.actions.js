import ActivityActionTypes from "./activity.types";

export const setSelectedActivity = activity => ({
    type: ActivityActionTypes.SET_SELECTED_ACTIVITY,
    payload: activity
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

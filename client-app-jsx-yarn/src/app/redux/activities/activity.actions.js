import ActivityActionTypes from "./activity.types";

export const setSelectedActivity = activity => ({
    type: ActivityActionTypes.SET_SELECTED_ACTIVITY,
    payload: activity
});

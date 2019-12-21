import {createSelector} from "reselect";

const selectActivityDashboard = state => state.activityDashboard;

// MEMOIZATION
export const selectSelectedActivity = createSelector(
    [selectActivityDashboard],
    (activityDashboard) => activityDashboard.selectedActivity
);


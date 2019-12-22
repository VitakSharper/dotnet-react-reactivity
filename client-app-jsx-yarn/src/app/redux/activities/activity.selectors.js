import {createSelector} from "reselect";

const selectActivityDashboard = state => state.activityDashboard;

// MEMOIZATION
export const selectSelectedActivity = createSelector(
    [selectActivityDashboard],
    (activityDashboard) => activityDashboard.selectedActivity
);

export const selectActivities = createSelector(
    [selectActivityDashboard],
    (activityDashboard) => activityDashboard.activities
);

export const selectIsActivitiesFetching = createSelector(
    [selectActivityDashboard],
    activityDashboard => activityDashboard.isFetching
);

export const selectIsActivitiesLoaded = createSelector(
    [selectActivityDashboard],
    activityDashboard => !!activityDashboard.activities
);

import {createSelector} from "reselect";

const selectActivityDashboard = state => state.activityDashboard;

// MEMOIZATION

export const selectActivities = createSelector(
    [selectActivityDashboard],
    (activityDashboard) => {
        return activityDashboard.activities ? Object.values(activityDashboard.activities) : [];
    }
);

export const selectSelectedActivity = createSelector(
    [selectActivityDashboard],
    (activityDashboard) => activityDashboard.selectedActivity
);

export const selectEditMode = createSelector(
    [selectActivityDashboard],
    (activityDashboard) => activityDashboard.editMode
);

export const selectIsActivitiesFetching = createSelector(
    [selectActivityDashboard],
    activityDashboard => activityDashboard.isFetching
);

export const selectIsActivitiesLoaded = createSelector(
    [selectActivityDashboard],
    activityDashboard => !!activityDashboard.activities
);

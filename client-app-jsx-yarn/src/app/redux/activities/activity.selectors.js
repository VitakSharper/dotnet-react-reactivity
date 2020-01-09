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
    (activityDashboard) => activityDashboard.selectedActivity && activityDashboard.selectedActivity[0]
);

export const selectEditMode = createSelector(
    [selectActivityDashboard],
    (activityDashboard) => activityDashboard.editMode
);

export const selectSubmitting = createSelector(
    [selectActivityDashboard],
    activityDashboard => activityDashboard.submitting
);

export const selectIsActivitiesLoaded = createSelector(
    [selectActivityDashboard],
    activityDashboard => !!activityDashboard.activities
);

export const selectBtnTarget = createSelector(
    [selectActivityDashboard],
    activityDashboard => activityDashboard.btnTarget
);

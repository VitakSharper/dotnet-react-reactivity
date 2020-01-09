export const setSelectedActivity = (activityId, activities) => {
    if (activities[activityId]) {
        return [{...activities[activityId]}];
    }
    return null
};

export const editExistingActivity = (activity, activities) => {
    if (activities[activity.id]) {
        activities[activity.id] = activity;
        return activities
    }
    return activities
};

export const addActivity = (activity, activities) => {
    console.log('in utils: ', activity);
    if (activity) {
        activities[activity.id] = activity
    }
    return activities;
};

export const removeExistingActivity = (activityId, activities) => {
    delete activities[activityId];
    return activities;
};

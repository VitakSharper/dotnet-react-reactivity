export const setSelectedActivity = (activityId, activities) => {
    // const existActivity = activities.find(a => a.id === activityId);
    const activity = [];

    if (activities[activityId]) {
        activity.push(activities[activityId]);
        return activity;
        // return Object.keys(activities[activityId]).reduce((acc, key) => {
        //     acc[key] = activities[activityId][key];
        //     return acc
        // }, []);
    }
    return null
};

export const editExistingActivity = (activity, activities) => {
    // const existActivity = activities.find(a => a.id === activity.id);
    if (activities[activity.id]) {
        activities[activity.id] = activity;
        return activities
    }
    return activities
};

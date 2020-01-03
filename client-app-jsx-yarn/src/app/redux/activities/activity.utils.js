export const setSelectedActivity = (activityId, activities) => {
    const existActivity = activities.find(a => a.id === activityId);
    if (existActivity) {
        return existActivity
    }
    return null
};

export const editExistingActivity = (activity, activities) => {
    const existActivity = activities.find(a => a.id === activity.id);

    console.log('Edited: ', existActivity)
    if (existActivity) {
        return activities
    }
    return activities
};

export const fetchActivities = (activities) => {
    activities = activities.slice();
    console.log('Data normalize: ', activities);
    activities.map(a => {
        a.date = a.date.split('.')[0];
        return a;
    });


    return activities;
};

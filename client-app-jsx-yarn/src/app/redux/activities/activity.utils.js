export const setSelectedActivity = (activityId, activities) => {
    const existActivity = activities.find(a => a.id === activityId);
    if (existActivity) {
        return existActivity
    }
    return null
};

export const dataNormalizeToObject = (activities) => {

    return activities.reduce((acc, item) => {
        // acc[item.id] = (({id, ...params}) => params)(item);
        acc[item.id] =item;
        return acc;
    }, {});
};

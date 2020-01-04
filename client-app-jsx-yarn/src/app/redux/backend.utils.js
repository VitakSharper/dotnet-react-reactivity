export const dataNormalizeToObject = (activities) => {
    return activities.map(a => {
        a.date = a.date.split('.')[0];
        return a;
    }).reduce((acc, item) => {
        // acc[item.id] = (({id, ...params}) => params)(item);
        acc[item.id] = item;
        return acc;
    }, {});
};

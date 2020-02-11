import {IActivity} from "../../models/activity";
import {IUser} from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = `${time.getHours()}:${time.getMinutes()}:00`;
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return new Date(`${dateString} ${timeString}`)
};

export const setActivityProps = (activity: IActivity, user: IUser) => ({
    ...activity,
    date: new Date(activity.date),
    isGoing: activity.attendees.some(activity => activity.username === user?.username),
    isHost: activity.attendees.some(activity => activity.username === user?.username && activity.isHost)
});

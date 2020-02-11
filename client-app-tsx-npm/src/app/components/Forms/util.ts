import {IActivity, IAttendee} from "../../models/activity";
import {IUser} from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = `${time.getHours()}:${time.getMinutes()}:00`;
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return new Date(`${dateString} ${timeString}`)
};

// export const setActivityProps = (activity: IActivity, user: IUser) => ({
//     ...activity,
//     date: new Date(activity.date),
//     isGoing: activity.attendees.some(activity => activity.username === user?.username),
//     isHost: activity.attendees.some(activity => activity.username === user?.username && activity.isHost)
// });

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some(
        a => a.username === user.username
    );
    activity.isHost = activity.attendees.some(
        a => a.username === user.username && a.isHost
    );
    return activity;
};


export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    }
};

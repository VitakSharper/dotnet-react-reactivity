import {IActivity, IAttendee} from "../../models/activity";
import {IUser} from "../../models/user";
import {IProfile} from "../../models/profile";

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

export const transformUserData = (user: IUser, displayName?: string): IUser =>
    ({
        ...user,
        displayName: `${user.displayName[0].toUpperCase()}${user.displayName.substring(1, user.displayName.length).toLowerCase()}`
    });

export const transformProfileData = (profile: IProfile): IProfile =>
    ({
        ...profile,
        displayName: `${profile.displayName[0].toUpperCase()}${profile.displayName.substring(1, profile.displayName.length).toLowerCase()}`
    });


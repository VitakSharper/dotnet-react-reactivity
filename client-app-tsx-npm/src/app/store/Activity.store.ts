import {action, computed, observable, reaction, runInAction} from "mobx";
import {SyntheticEvent} from "react";
import {IActivity} from "../models/activity";
import {Activities} from "../api/agent";
import {history} from "../../index";

import {createAttendee, setActivityProps} from "../components/helpers/util";

import {toast} from "react-toastify";
import {RootStore} from "./Root.store";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

const LIMIT = 2;

export default class ActivityStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.activityRegistry.clear();
                this.loadActivities();
            }
        )
    }

    @observable activityRegistry = new Map<string, IActivity>();
    @observable activity: IActivity | undefined;
    @observable loading = false;
    @observable submitting = false;
    @observable editMode = false;
    @observable openForm = false;
    @observable target = '';
    @observable profileChanged = false;
    @observable.ref hubConnection: HubConnection | null = null;
    @observable activityCount = 0;
    @observable page = 0;
    @observable predicate = new Map();

    @action setPredicate = (predicate: string, value: string | Date) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value)
        }
    };

    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', LIMIT.toString());
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, value.toISOString())
            } else {
                params.append(key, value)
            }
        });
        return params;
    }

    @computed get totalPages() {
        return Math.ceil(this.activityCount / LIMIT);
    }

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
    };

    @action setPage = (page: number) => {
        this.page = page;
    };

    @action createHubConnection = (activityId: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat', {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection!
            .start()
            .then(() => console.log(this.hubConnection!.state))
            .then(() => {
                console.log('Attempting to join group.');
                if (this.hubConnection!.state === 'Connected')
                    this.hubConnection!.invoke('AddToGroup', activityId);
            })
            .catch(err => console.log('Error establishing connection: ', err));

        this.hubConnection!.on('ReceiveComment', comment => {
            runInAction(() => {
                this.activity!.comments.push(comment);
            })
        });

        this.hubConnection.on('Send', message => {
            toast.info(message);
        })
    };

    @action stopHubConnection = () => {
        this.hubConnection!.invoke('RemoveFromGroup', this.activity!.id)
            .then(() => {
                this.hubConnection!.stop();
            })
            .then(() => console.log('Connection stopped!'))
            .catch(err => console.log(err))
    };

    @action addComment = async (values: any) => {
        values.activityId = this.activity!.id;
        try {
            await this.hubConnection!.invoke('SendComment', values); // not using axios bug invoke method directly to the api server
        } catch (e) {
            console.log(e)
        }
    };

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.slice().sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        );

        // const transformedDate = (date: string) => {
        //     return date.split('T')[0];
        // };
        //
        // const dateCategory = sortedActivities.reduce((acc, item) => ({
        //     ...acc,
        //     [transformedDate(item.date)]: []
        // }), {} as { [key: string]: IActivity[] });
        //
        // return Object.entries(
        //     sortedActivities.reduce((acc, item) => {
        //         acc[transformedDate(item.date)] = [...acc[transformedDate(item.date)], item];
        //         return acc;
        //     }, dateCategory)
        // );
        return Object.entries(
            sortedActivities.reduce((acc, v) => {
                const date = v.date.toISOString().split('T')[0];
                acc[date] = acc[date] ? [...acc[date], v] : [v];
                return acc;
            }, {} as { [key: string]: IActivity[] })
        );
    }

    @action loadActivities = async () => {
        this.loading = true;
        try {
            const activitiesEnvelope = await Activities.list(this.axiosParams);
            const {activityCount, activities} = activitiesEnvelope;
            runInAction('Loading Activities', () => {
                this.activityCount = activityCount;
                activities
                    .map(a => setActivityProps(a, this.rootStore.userStore.user!))
                    .reduce((acc, v) => acc.set(v.id, v), this.activityRegistry);
                // activities.forEach(a => {
                //     setActivityProps(a, this.rootStore.userStore.user!);
                //     this.activityRegistry.set(a.id, a);
                // })
            });
        } catch (e) {
            toast.error('Problem to load activities.')
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.activityRegistry.get(id);
        if (activity) {
            this.activity = activity
        } else {
            this.loading = true;
            try {
                activity = await Activities.details(id);
                runInAction('Getting activity', () => {
                    // activity!.date = new Date(activity!.date);
                    this.activity = activity;
                })
            } catch (e) {
                console.log(e);
            } finally {
                runInAction(() => {
                    this.loading = false;
                })
            }
        }
    };

    @action getActivityById = async (id: string) => {
        const activity = this.activityRegistry.get(id);
        if (activity) {
            this.activity = activity;
            return activity;
        } else {
            this.loading = true;
            try {
                const response = await Activities.details(id);
                runInAction('Getting activity', () => {
                    setActivityProps(response, this.rootStore.userStore.user!);
                    this.activity = response;
                    this.activityRegistry.set(response.id, response);
                });
                return response;
            } catch (e) {
                console.log(e);
            } finally {
                runInAction(() => {
                    this.loading = false;
                })
            }
        }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await Activities.create(activity);
            const attendee = createAttendee(this.rootStore.userStore.user!);
            attendee.isHost = true;
            let attendees = [];
            attendees.push(attendee);
            activity.attendees = attendees;
            activity.comments = [];
            activity.isHost = true;
            runInAction('Create new activity', () => {
                this.activityRegistry.set(activity.id, activity);
                toast.info(`New activity added: ${activity.title}`);
            });
            history.push(`/activities/${activity.id}`)
        } catch (e) {
            toast.error(e.response.data.title)
        } finally {
            runInAction(() => {
                this.submitting = false
            })
        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await Activities.update(activity);
            runInAction('Update existing activity', () => {
                this.activityRegistry.set(activity.id, activity);
                // this.selectActivity(activity.id);
                toast.info(`Update ${activity.title} success `);
            });
            history.push(`/activities/${activity.id}`)
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.title)
        } finally {
            runInAction(() => {
                this.submitting = false
            })
        }
    };

    @action deleteActivity = async (id: string, e: SyntheticEvent<HTMLButtonElement>) => {
        this.target = e.currentTarget.name;
        this.submitting = true;
        try {
            await Activities.delete(id);
            runInAction('Delete an existing activity', () => {
                this.activityRegistry.delete(id);
                this.activity = undefined;
            })
        } catch (e) {
            console.log(e);
        } finally {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            })
        }
    };

    @action attendActivity = async () => {
        const attendee = createAttendee(this.rootStore.userStore.user!);
        this.submitting = true;
        try {
            await Activities.attend(this.activity!.id);
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees.push(attendee);
                    this.activity.isGoing = true;
                    this.activityRegistry.set(this.activity.id, this.activity);
                }
            })
        } catch (e) {
            toast.error('Problem signing up to activity.')
        } finally {
            runInAction(() => {
                this.submitting = false;
            })
        }
    };

    @action cancelAttendance = async () => {
        this.submitting = true;
        try {
            await Activities.unAttend(this.activity!.id);
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees = this.activity.attendees.filter(a => a.username !== this.rootStore.userStore.user!.username);
                    this.activity.isGoing = false;
                    this.activityRegistry.set(this.activity.id, this.activity)
                }
            })
        } catch (e) {
            toast.error('Problem cancelling attendance.')
        } finally {
            runInAction(() => {
                this.submitting = false;
            })
        }
    };

    @action setActivity = (activity: IActivity) => {
        this.activity = activity
    };

    @action setEditMode = (mode: boolean) => {
        this.editMode = mode;
    };

    @action setOpenForm = (mode: boolean) => {
        this.openForm = mode;
    };

    @action setActivityNull = () => {
        this.activity = undefined;
    };
}

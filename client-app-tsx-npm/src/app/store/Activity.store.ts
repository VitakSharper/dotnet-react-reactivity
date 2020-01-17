import {observable, action, computed, configure, runInAction} from "mobx";
import {createContext, SyntheticEvent} from "react";
import {IActivity} from "../models/activity";
import Activities from "../api/agent";

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegistry = new Map<string, IActivity>();
    @observable activity: IActivity | undefined;
    @observable loading = false;
    @observable submitting = false;
    @observable editMode = false;
    @observable openForm = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.slice().sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
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
                const date = v.date.split('T')[0];
                acc[date] = acc[date] ? [...acc[date], v] : [v];
                return acc;
            }, {} as { [key: string]: IActivity[] })
        );
    }

    @action loadActivities = async () => {
        this.loading = true;
        try {
            const response = await Activities.list();
            console.log('Pre loading: ', this.groupActivitiesByDate(response));
            runInAction('Loading Activities', () => {
                this.activityRegistry = response
                    .map(a => {
                        a.date = a.date.split('.')[0];
                        return a;
                    })
                    .reduce((acc, v) => acc.set(v.id, v), new Map<string, IActivity>());
            });
        } catch (e) {
            console.log(e)
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
        this.loading = true;
        try {
            const response = await Activities.details(id);
            runInAction('Getting activity', () => {
                this.activity = response;
            });
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    };

    @action selectActivity = (id: string) => {
        // this.activity = this.activityRegistry.get(id);
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await Activities.create(activity);
            runInAction('Create new activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
            });
        } catch (e) {
            console.log(e);
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
                this.selectActivity(activity.id);
            })
        } catch (e) {
            console.log(e);
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

const activityStore = createContext(new ActivityStore());

export default activityStore;

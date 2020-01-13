import {observable, action, computed, configure, runInAction} from "mobx";
import {createContext, SyntheticEvent} from "react";
import {IActivity} from "../models/activity";
import Activities from "../api/agent";

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegistry = new Map<string, IActivity>();
    @observable selectedActivity: IActivity | undefined = undefined;
    @observable loading = false;
    @observable submitting = false;
    @observable editMode = false;
    @observable openForm = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).slice().sort(((a, b) => Date.parse(a.date) - Date.parse(b.date)))
    }

    @action loadActivities = async () => {
        this.loading = true;
        try {
            const response = await Activities.list();
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
            this.selectedActivity = activity
        } else {
            this.loading = true;
            try {
                activity = await Activities.details(id);
                runInAction('Getting activity', () => {
                    this.selectedActivity = activity;
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

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await Activities.create(activity);
            runInAction('Create new activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
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
                this.selectedActivity = undefined;
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

    @action setSelectedActivityNull = () => {
        this.selectedActivity = undefined;
    };
}

const activityStore = createContext(new ActivityStore());

export default activityStore;

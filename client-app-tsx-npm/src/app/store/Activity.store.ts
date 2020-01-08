import {observable, action} from "mobx";
import {createContext, SyntheticEvent} from "react";
import {IActivity} from "../models/activity";
import Activities from "../api/agent";

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | null = null;
    @observable loading = false;
    @observable submitting = false;
    @observable editMode = false;
    @observable target = '';

    @action loadActivities = () => {
        this.loading = true;
        Activities.list()
            .then(resp => {
                resp.forEach((a) => {
                    a.date = a.date.split('.')[0];
                });
                this.activities = resp.slice();
            }).then(() => this.loading = false)
            .catch(err => console.log(err))
            .finally(() => this.loading = false)
    };
    @action createActivity = (activity: IActivity) => {
        this.submitting = true;
        Activities.create(activity).then(() => {
            // setActivities([...activities, activity]);
            this.selectedActivity = activity;
            this.editMode = false;
        }).then(() => this.submitting = false)
    };
    @action editActivity = (activity: IActivity) => {
        this.submitting = true;
        Activities.update(activity).then(() => {
            this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
            this.selectedActivity = activity;
            this.editMode = false;
        }).then(() => this.submitting = false)
    };
    @action selectActivity = (id: string) => {
        this.editMode = false;
        this.selectedActivity = this.activities.filter(a => a.id === id)[0];
    };
    @action deleteActivity = (id: string, e: SyntheticEvent<HTMLButtonElement>) => {
        this.target = e.currentTarget.name;
        this.submitting = true;
        Activities.delete(id).then(() => {
            this.activities = this.activities.filter(a => a.id !== id);
        }).then(() => this.submitting = false)
    };

    @action setEditMode = () => {
        this.editMode = !this.editMode
    };
    @action setSelectedActivity = () => {
        this.selectedActivity = null;
    }
}

const activityStore = createContext(new ActivityStore());

export default activityStore;

import ActivityStore from "./Activity.store";
import UserStore from "./User.store";
import {createContext} from "react";
import {configure} from "mobx";

configure({enforceActions: 'always'}); // strict-mode is enabled

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());

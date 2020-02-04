import ActivityStore from "./Activity.store";
import UserStore from "./User.store";
import {createContext} from "react";
import {configure} from "mobx";
import CommonStore from "./Common.store";

configure({enforceActions: 'always'}); // strict-mode is enabled

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());

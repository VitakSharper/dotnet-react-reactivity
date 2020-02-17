import ActivityStore from "./Activity.store";
import UserStore from "./User.store";
import {createContext} from "react";
import {configure} from "mobx";
import CommonStore from "./Common.store";
import ModalStore from "./Modal.store";
import ProfileStore from "./Profile.store";

configure({enforceActions: 'always'}); // strict-mode is enabled

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());

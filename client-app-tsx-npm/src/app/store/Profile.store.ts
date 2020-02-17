import {RootStore} from "./Root.store";
import {action, computed, observable, runInAction} from "mobx";
import {IProfile} from "../models/profile";
import {Profiles} from "../api/agent";
import {toast} from "react-toastify";

export default class ProfileStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = true;

    @computed get isCurrentUser() {
        if (this.rootStore.userStore.user && this.profile) {
            return this.rootStore.userStore.user.username === this.profile.username
        } else return false;
    }

    @action Load = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await Profiles.get(username);

            runInAction(() => {
                this.profile = profile;
            })

        } catch (e) {
            toast.error(e.response.data.title)
        } finally {
            runInAction(() => {
                this.loadingProfile = false;
            })
        }
    }

}

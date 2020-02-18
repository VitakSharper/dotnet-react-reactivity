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
    @observable uploadingPhoto = false;

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
            toast.error(e.response.data.title);
        } finally {
            runInAction(() => {
                this.loadingProfile = false;
            })
        }
    };

    @action Edit = async (editedProfile: Partial<IProfile>) => {
        try {
            await Profiles.edit(editedProfile);
            runInAction(() => {
                if (editedProfile.displayName !== this.rootStore.userStore.user?.displayName) {
                    this.rootStore.userStore.user!.displayName = editedProfile.displayName!
                }
                this.profile = {...this.profile!, ...editedProfile};
                this.rootStore.modalStore.modalState(null, false);
                toast.info('Profile update successfully.');
            })
        } catch (e) {
            toast.error(e.response.data.title);
        }
    };

    @action uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const photo = await Profiles.updloadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos.push(photo);
                    if (photo.isMain && this.rootStore.userStore.user) {
                        this.rootStore.userStore.user.image = photo.url;
                        this.profile.image = photo.url;
                    }
                }
            })
        } catch (e) {
            toast.error('Problem uploading Photo.')
        } finally {
            runInAction(() => {
                this.uploadingPhoto = false;
            })
        }
    }
}

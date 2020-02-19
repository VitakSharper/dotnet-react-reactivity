import {RootStore} from "./Root.store";
import {action, computed, observable, runInAction} from "mobx";
import {IPhoto, IProfile} from "../models/profile";
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
    @observable loading = false;

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
            const photo = await Profiles.uploadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos.push(photo);
                    if (photo.isMain && this.rootStore.userStore.user) {
                        this.rootStore.userStore.user.image = photo.url;
                        this.profile.image = photo.url;
                    }
                }
                toast.info('Uploading photo successfully.')
            })
        } catch (e) {
            toast.error('Problem uploading Photo.')
        } finally {
            runInAction(() => {
                this.uploadingPhoto = false;
            })
        }
    };

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await Profiles.setMainPhoto(photo.id);
            runInAction(() => {
                this.rootStore.userStore.user!.image = photo.url;
                this.profile!.photos.find(p => p.isMain)!.isMain = false;
                this.profile!.photos.find(p => p.id === photo.id)!.isMain = true;
                this.profile!.image = photo.url;
            });
            toast.info('Main photo changed successfully.')
        } catch (e) {
            toast.error('Problem set main Photo.')
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    };

    @action deletePhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await Profiles.deletePhoto(photo.id);
            runInAction(() => {
                this.profile!.photos = this.profile!.photos.filter(p => p.id !== photo.id);
            });
            toast.info('Photo deleted successfully.');
        } catch (e) {
            toast.error('Problem delete Photo.')
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

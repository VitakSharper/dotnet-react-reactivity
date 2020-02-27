import {RootStore} from "./Root.store";
import {action, computed, observable, reaction, runInAction} from "mobx";
import {IPhoto, IProfile} from "../models/profile";
import {Profiles} from "../api/agent";
import {toast} from "react-toastify";

export default class ProfileStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.activeTab,
            activeTab => {
                switch (activeTab) {
                    case 0:
                    case 1:
                    case 2:
                        break;
                    case 3:
                        this.loadFollowings('followers');
                        break;
                    case 4:
                        this.loadFollowings('following');
                        break;
                    default:
                        this.followings = [];
                        break;
                }
            }
        )
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = true;
    @observable uploadingPhoto = false;
    @observable loading = false;
    @observable followings: IProfile[] = [];
    @observable activeTab: number = 0;

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
                this.rootStore.userStore.user?.username === profile.username
                    ? this.profile = profile
                    : this.profile = {...profile, photos: [...profile.photos.filter(p => !p.status)]};
            })
        } catch (e) {
            toast.error(e);
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
                this.rootStore.activityStore.profileChanged = true;
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

    @action setStatusPhoto = async (id: string) => {
        try {
            await Profiles.setStatusPhoto(id);
            runInAction(() => {
                this.profile?.photos.forEach(p => {
                    if (p.id === id) p.status = !p.status
                })
            })
        } catch (e) {
            toast.error('Problem change photo status.')
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
    };

    @action follow = async (username: string) => {
        this.loading = true;
        try {
            await Profiles.follow(username);
            runInAction(() => {
                this.profile!.following = true;
                this.profile!.followersCount++;
            })
        } catch (e) {
            toast.error('Problem following user.')
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    };

    @action unFollow = async (username: string) => {
        this.loading = true;
        try {
            await Profiles.unFollow(username);
            runInAction(() => {
                this.profile!.following = false;
                this.profile!.followersCount--;
            })
        } catch (e) {
            toast.error('Problem unfollowing user.')
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    };

    @action loadFollowings = async (are: string) => {
        this.loading = true;
        try {
            const profiles = await Profiles.listFollowings(this.profile!.username, are);
            runInAction(() => {
                this.followings = profiles;
            })
        } catch (e) {
            toast.error('Problem load followings.')
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    };

    @action setActiveTab = (activeIndex: number) => {
        this.activeTab = activeIndex
    }
}

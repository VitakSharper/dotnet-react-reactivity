import {action, computed, observable, runInAction} from "mobx";
import {IUser, IUserFormValues} from "../models/user";
import {Users} from "../api/agent";
import {RootStore} from "./Root.store";
import {history} from "../../index";

export default class UserStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await Users.login(values);
            runInAction(() => {
                this.user = user;
            });
            this.rootStore.commonStore.setToken(user.token);
            history.push('/activities');
        } catch (e) {
            throw e;
        }
    };

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
    };

    @action getUser = async () => {
        try {
            const user = await Users.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (e) {
            console.log(e);
        }
    }
}

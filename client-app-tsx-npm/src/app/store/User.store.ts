import {action, computed, observable, runInAction} from "mobx";
import {IUser, IUserFormValues} from "../models/user";
import {Users} from "../api/agent";
import {RootStore} from "./Root.store";
import {history} from "../../index";
import {transformUserData} from "../components/helpers/util";

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
            this.storeUser(user);
            history.push('/activities');
        } catch (e) {
            throw e;
        }
    };

    @action Register = async (values: IUserFormValues) => {
        try {
            const user = await Users.register(values);
            this.storeUser(user);
            history.push('/activities');
        } catch (e) {
            throw e;
        }
    };

    storeUser(user: IUser) {
        runInAction(() => {
            this.user = transformUserData(user);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.modalState(null, false);
        });
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
    };

    @action getUser = async () => {
        try {
            const user = await Users.current();
            runInAction(() => {
                this.user = transformUserData(user);
            })
        } catch (e) {
            console.log(e);
        }
    }
}

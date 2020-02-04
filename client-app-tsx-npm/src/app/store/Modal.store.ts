import {RootStore} from "./Root.store";
import {action, observable} from "mobx";

export default class ModalStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable.shallow modal = {
        open: false,
        body: null
    };

    @action modalState = (content: any, state: boolean) => {
        this.modal.open = state;
        this.modal.body = content;
    };
}

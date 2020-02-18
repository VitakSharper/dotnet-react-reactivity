import React, {useContext} from 'react'
import {Modal} from 'semantic-ui-react'
import {RootStoreContext} from "../../store/Root.store";
import {observer} from "mobx-react-lite";

const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const {modal: {body, open}} = rootStore.modalStore;

    return (
        <Modal open={open} size={"mini"}>
            <Modal.Content>
                {body}
            </Modal.Content>
        </Modal>
    )
};

export default observer(ModalContainer)

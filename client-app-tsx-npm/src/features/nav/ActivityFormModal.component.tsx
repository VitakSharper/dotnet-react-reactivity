import React, {useContext} from 'react'
import {Header, Modal} from 'semantic-ui-react'

import ActivityForm from "../activities/dashboard/ActivityForm.component";
import {observer} from "mobx-react-lite";
import activityStore from "../../app/store/Activity.store";

const ActivityFormModal = () => {
    const ActivityStore = useContext(activityStore);
    const {createMode} = ActivityStore;

    return (
        <Modal open={createMode} basic size='small'>
            <Header icon='add' content='CREATE A NEW ACTIVITY'/>
            <Modal.Content>
            </Modal.Content>
            <Modal.Actions>
                <ActivityForm/>
            </Modal.Actions>
        </Modal>)
};

export default observer(ActivityFormModal)

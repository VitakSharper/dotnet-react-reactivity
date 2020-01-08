import React, {useState} from 'react'
import {Header, Modal} from 'semantic-ui-react'

import ActivityForm from "../activities/dashboard/ActivityForm.component";
import {IActivity} from "../../app/models/activity";

type IProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    createMode: boolean;
    setCreateMode: (mode: boolean) => void;
}

const ActivityFormModal: React.FC<IProps> = ({open, setOpen, createMode, setCreateMode}) => {
    return (
        <Modal open={open} basic size='small'>
            <Header icon='add' content='CREATE A NEW ACTIVITY'/>
            <Modal.Content>
            </Modal.Content>
            <Modal.Actions>
                <ActivityForm
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setOpen={setOpen}/>
            </Modal.Actions>
        </Modal>)
};

export default ActivityFormModal

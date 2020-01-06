import React from 'react'
import {Header, Modal} from 'semantic-ui-react'

import ActivityForm from "../activities/dashboard/ActivityForm.component";
import {IActivity} from "../../app/models/activity";

type IProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleEditActivities: (activity: IActivity) => void;
}

const ActivityFormModal: React.FC<IProps> = ({open, setOpen, handleEditActivities}) => {

    return (
        <Modal open={open} basic size='small'>
            <Header icon='add' content='CREATE A NEW ACTIVITY'/>
            <Modal.Content>
            </Modal.Content>
            <Modal.Actions>
                <ActivityForm
                    editMode={open}
                    setEditMode={setOpen}
                    createMode={true}
                    handleCreateActivity={handleEditActivities}/>
            </Modal.Actions>
        </Modal>
    )
};

export default ActivityFormModal

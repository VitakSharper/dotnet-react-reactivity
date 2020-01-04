import React from 'react'
import {Header, Modal} from 'semantic-ui-react'

import ActivityForm from "./ActivityForm.component";

const ActivityModalForm = ({open, setOpen}) => {

    return (
        <Modal open={open} basic size='small'>
            <Header icon='add' content='CREATE A NEW ACTIVITY'/>
            <Modal.Content>
            </Modal.Content>
            <Modal.Actions>
                <ActivityForm
                    setOpen={setOpen}/>
            </Modal.Actions>
        </Modal>
    )
};

export default ActivityModalForm

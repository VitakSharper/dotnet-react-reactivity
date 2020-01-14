import React, {useContext, useEffect} from 'react'
import {RouteComponentProps} from 'react-router';
import {Header, Modal} from 'semantic-ui-react'

import ActivityForm from "../activities/dashboard/ActivityForm.component";
import {observer} from "mobx-react-lite";
import activityStore from "../../app/store/Activity.store";

interface DetailParams {
    id: string;
}

const ActivityFormModal: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const ActivityStore = useContext(activityStore);
    const {openForm, editMode, activity, setEditMode, setOpenForm, setSelectedActivityNull} = ActivityStore;

    useEffect(() => {
        if (match.params.id) {
            setEditMode(true);
            setOpenForm(true);
        } else {
            setSelectedActivityNull();
            setEditMode(false);
            setOpenForm(true);
        }
    }, [setEditMode, setOpenForm, setSelectedActivityNull, match.params.id]);


    return (
        <Modal open={openForm} basic size='small'>
            <Header icon={editMode ? 'edit' : 'add'}
                    content={editMode ? `EDIT ${activity?.title}` : 'CREATE A NEW ACTIVITY'}/>
            <Modal.Content>
            </Modal.Content>
            <Modal.Actions>
                <ActivityForm activityId={match.params?.id}/>
            </Modal.Actions>
        </Modal>)
};

export default observer(ActivityFormModal)

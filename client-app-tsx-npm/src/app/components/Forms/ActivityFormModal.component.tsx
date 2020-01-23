import React, {useContext, useEffect} from 'react'
import {RouteComponentProps} from 'react-router';
import {Header, Modal} from 'semantic-ui-react'

import ActivityForm from "./ActivityForm.component";
import {observer} from "mobx-react-lite";
import activityStore from "../../store/Activity.store";
import LoadingSpinner from "../LoadingSpinner.component";

interface DetailParams {
    id: string;
}

const ActivityFormModal: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const ActivityStore = useContext(activityStore);
    const {openForm, loading, editMode, activity, setEditMode, setOpenForm, setActivityNull, getActivityById} = ActivityStore;

    useEffect(() => {
        if (match.params.id) {
            getActivityById(match.params.id).then(() => {
                setEditMode(true);
                setOpenForm(true);
            });
        } else {
            setActivityNull();
            setEditMode(false);
            setOpenForm(true);
        }
    }, [setEditMode, setOpenForm, setActivityNull, getActivityById, match.params.id]);

    if (loading)
        return (<LoadingSpinner content={'Loading activities...'} inverted={true}/>);

    return (
        <Modal open={openForm} basic size='small'>
            <Header icon={editMode ? 'edit' : 'add'}
                    content={editMode ? `EDIT ${activity?.title}` : 'CREATE A NEW ACTIVITY'}/>
            <Modal.Content>
            </Modal.Content>
            <Modal.Actions>
                <ActivityForm/>
            </Modal.Actions>
        </Modal>)
};

export default observer(ActivityFormModal)

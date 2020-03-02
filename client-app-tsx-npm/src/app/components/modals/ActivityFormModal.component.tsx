import React, {useContext, useEffect} from 'react'
import {RouteComponentProps} from 'react-router';
import {observer} from "mobx-react-lite";
import {Header, Modal} from 'semantic-ui-react'

import {RootStoreContext} from "../../store/Root.store";

import ActivityForm from "../Forms/ActivityForm.component";
import LoadingSpinner from "../helpers/LoadingSpinner.component";

interface DetailParams {
    id: string;
}

const ActivityFormModal: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const rootStore = useContext(RootStoreContext);
    const {activityStore: {openForm, loading, editMode, activity, setEditMode, setOpenForm, setActivityNull, getActivityById, setActivity}} = rootStore;


    useEffect(() => {
        if (match.params.id) {
            getActivityById(match.params.id)
                .then((activity) => {
                    setActivity(activity!);
                    setEditMode(true);
                    setOpenForm(true);
                });
        } else {
            setActivityNull();
            setEditMode(false);
            setOpenForm(true);
        }
    }, [setEditMode, setOpenForm, setActivityNull, getActivityById, match.params.id, setActivity]);

    if (loading)
        return (<LoadingSpinner content={'Loading activities...'} inverted={true}/>);

    return (
        <Modal open={openForm} basic size='small'>
            <Header icon={editMode ? 'edit' : 'add'}
                    content={editMode ? `EDIT ${activity?.title}` : 'CREATE A NEW ACTIVITY'}/>
            <Modal.Content>
                <ActivityForm/>
            </Modal.Content>
        </Modal>
    )
};

export default observer(ActivityFormModal)

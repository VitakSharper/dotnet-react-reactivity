import React, {useContext, useEffect} from "react";
import {RouteComponentProps} from 'react-router';

import ActivityCard from "../../../app/layout/ActivityCard.component";
import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";
import LoadingSpinner from "../../../app/layout/LoadingSpinner.component";

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const ActivityStore = useContext(activityStore);
    const {activity, setEditMode, setOpenForm, loadActivity, loading} = ActivityStore;

    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match]);

    const handleModalForm = () => {
        setEditMode(true);
        setOpenForm(true);
    };

    if (loading) return <LoadingSpinner content={'Loading activity...'} inverted={true}/>;

    return (
        <ActivityCard
            selectedActivity={activity}
            handleModalForm={handleModalForm}
        />)
};

export default observer(ActivityDetails);

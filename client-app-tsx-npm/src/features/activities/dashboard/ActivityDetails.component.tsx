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
    const {activity, loading, getActivityById} = ActivityStore;

    useEffect(() => {
        getActivityById(match.params.id)
    }, [getActivityById, match.params.id]);

    if (loading) return <LoadingSpinner content={'Loading activity...'} inverted={true}/>;

    return (
        <ActivityCard
            activity={activity}
        />)
};

export default observer(ActivityDetails);

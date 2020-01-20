import React, {useContext, useEffect} from "react";
import {RouteComponentProps} from 'react-router';

import activityStore from "../../../store/Activity.store";
import {observer} from "mobx-react-lite";
import LoadingSpinner from "../../../components/LoadingSpinner.component";
import ActivityDetailGrid from "../../../components/ActivityDetailGrid.component";

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const ActivityStore = useContext(activityStore);
    const {loading, getActivityById} = ActivityStore;

    useEffect(() => {
        getActivityById(match.params.id)
    }, [getActivityById, match.params.id]);

    if (loading) return <LoadingSpinner content={'Loading activity...'} inverted={true}/>;

    // return (<ActivityDetailCard activity={activity}/>)
    return (<ActivityDetailGrid/>)
};

export default observer(ActivityDetails);

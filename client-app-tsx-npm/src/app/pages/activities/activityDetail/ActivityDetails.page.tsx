import React, {useContext, useEffect} from "react";
import {RouteComponentProps} from 'react-router';

import {observer} from "mobx-react-lite";
import LoadingSpinner from "../../../components/helpers/LoadingSpinner.component";
import ActivityDetailGrid from "../../../components/activity/ActivityDetailGrid.component";
import {RootStoreContext} from "../../../store/Root.store";

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {activityStore: {loading, getActivityById, activity, setActivity}} = rootStore;

    useEffect(() => {
        getActivityById(match.params.id).then(activity => {
            setActivity(activity);
        });
    }, [getActivityById, match.params.id, setActivity]);

    if (loading) return <LoadingSpinner content={'Loading activity...'} inverted={true}/>;

    if (!activity) return <h2>Activity not found</h2>;

    // return (<ActivityDetailCard activity={activity}/>)
    return (<ActivityDetailGrid/>)
};

export default observer(ActivityDetails);

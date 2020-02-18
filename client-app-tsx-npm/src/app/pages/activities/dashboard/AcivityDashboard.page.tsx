import React, {useContext, useEffect} from "react";
import {Grid, Segment} from "semantic-ui-react";

import ActivityDashboardList from "./ActivityDashboardList.component";
import LoadingSpinner from "../../../components/helpers/LoadingSpinner.component";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/Root.store";

const ActivityDashboard = () => {
    const rootStore = useContext(RootStoreContext);
    const {activityStore: {loadActivities, loading}} = rootStore;

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    if (loading) return <LoadingSpinner content={'Loading activities...'} inverted={true}/>;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityDashboardList/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <h2>Activity Filters</h2>
                </Grid.Column>
            </Grid>
        </Segment>)
};

export default observer(ActivityDashboard);

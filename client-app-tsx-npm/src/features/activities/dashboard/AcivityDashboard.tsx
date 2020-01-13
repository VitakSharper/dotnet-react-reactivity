import React, {useContext, useEffect} from "react";
import {Grid, Segment} from "semantic-ui-react";

import ActivitiesItems from "./Activities.component";
import LoadingSpinner from "../../../app/layout/LoadingSpinner.component";

import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";

const ActivityDashboard = () => {
    const ActivityStore = useContext(activityStore);
    const {loadActivities, loading, activitiesByDate} = ActivityStore;

    useEffect(() => {
        loadActivities()
    }, [loadActivities]);

    return (
        <Segment>
            <Grid>
                <Grid.Column width={10}>
                    {
                        loading
                            ? (<LoadingSpinner content={'Loading activities...'} inverted={true}/>)
                            : (<ActivitiesItems activities={activitiesByDate}/>)
                    }
                </Grid.Column>
                <Grid.Column width={6}>
                    <h2>Activity Filters</h2>
                </Grid.Column>
            </Grid>
        </Segment>)
};

export default observer(ActivityDashboard);

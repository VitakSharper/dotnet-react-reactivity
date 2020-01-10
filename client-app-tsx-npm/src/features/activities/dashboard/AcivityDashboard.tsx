import React, {useContext, useEffect} from "react";
import {Grid, Segment} from "semantic-ui-react";

import ActivitiesItems from "./Activities.component";
import ActivityDetails from "./ActivityDetails.component";
import ActivityForm from "./ActivityForm.component";
import LoadingSpinner from "../../../app/layout/LoadingSpinner.component";

import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";

const ActivityDashboard = () => {
    const ActivityStore = useContext(activityStore);
    const {loadActivities, loading, editMode, selectedActivity, activitiesByDate} = ActivityStore;

    useEffect(() => {
        loadActivities()
    }, [loadActivities]);

    if (loading) return <LoadingSpinner content={'Loading activities...'} inverted={true}/>;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={selectedActivity ? 10 : 16}>
                    <ActivitiesItems activities={activitiesByDate}/>
                </Grid.Column>
                {selectedActivity && !editMode && (
                    <Grid.Column width={6}>
                        <ActivityDetails/>
                    </Grid.Column>)}
                {editMode && (
                    <Grid.Column width={6}>
                        <ActivityForm/>
                    </Grid.Column>)}
            </Grid>
        </Segment>)
};

export default observer(ActivityDashboard);

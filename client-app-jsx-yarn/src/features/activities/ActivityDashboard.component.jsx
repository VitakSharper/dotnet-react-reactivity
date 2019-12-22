import React, {useEffect} from "react";
import {Grid, Segment} from "semantic-ui-react";

import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {fetchActivitiesStart} from "../../app/redux/activities/activity.actions";
import {
    selectActivities,
    selectSelectedActivity
} from "../../app/redux/activities/activity.selectors";

import ActivitiesContainer from "./Activities.container";
import ActivityDetails from "./ActivityDetails.component";
import ActivityForm from "./ActivityForm.component";

const ActivityDashboard = ({selectedActivity, fetchActivitiesStart, activities}) => {

    useEffect(() => {
        fetchActivitiesStart()
    }, [fetchActivitiesStart]);


    return (
        <Segment>
            <Grid>
                <Grid.Column width={10}>
                    <ActivitiesContainer activities={activities}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    {
                        selectedActivity && (<ActivityDetails selectedActivity={selectedActivity}/>)
                    }
                </Grid.Column>
            </Grid>
        </Segment>
    )
};

const mapStateToProps = createStructuredSelector({
    activities: selectActivities,
    selectedActivity: selectSelectedActivity,
});

const mapDispatchToProps = dispatch => ({
    fetchActivitiesStart: () => dispatch(fetchActivitiesStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDashboard);

import React, {useEffect} from "react";
import {Grid, Segment} from "semantic-ui-react";

import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {fetchActivitiesStart} from "../../app/redux/activities/activity.actions";
import {
    selectActivities,
    selectSelectedActivity,
    selectEditMode,
    selectIsActivitiesLoaded
} from "../../app/redux/activities/activity.selectors";

// import ActivitiesContainer from "./Activities.container";
import ActivitiesList from "./ActivitiesList.component";
import ActivityDetails from "./ActivityDetails.component";
import ActivityForm from "./ActivityForm.component";
import LoadingSpinner from "./LoadingSpinner.component";

const ActivityDashboard = ({selectedActivity, fetchActivitiesStart, activities, editMode, loading}) => {
    useEffect(() => {
        fetchActivitiesStart()
    }, [fetchActivitiesStart]);

    if (!loading) return (<LoadingSpinner content={'Loading activities...'} inverted={true}/>);

    return (
        <Segment>
            <Grid>
                <Grid.Column width={selectedActivity ? 10 : 16}>
                    <ActivitiesList activities={activities}/>
                </Grid.Column>
                {
                    selectedActivity && !editMode && (
                        <Grid.Column width={6}>
                            <ActivityDetails selectedActivity={selectedActivity}/>
                        </Grid.Column>
                    )
                }
                {
                    editMode && (
                        <Grid.Column width={6}>
                            <ActivityForm
                                activity={selectedActivity}
                            />
                        </Grid.Column>
                    )
                }
            </Grid>
        </Segment>
    )
};

const mapStateToProps = createStructuredSelector({
    activities: selectActivities,
    selectedActivity: selectSelectedActivity,
    editMode: selectEditMode,
    loading: selectIsActivitiesLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchActivitiesStart: () => dispatch(fetchActivitiesStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDashboard);

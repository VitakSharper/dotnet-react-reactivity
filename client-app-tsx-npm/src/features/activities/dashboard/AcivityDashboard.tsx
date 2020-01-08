import React, {SyntheticEvent, useContext, useEffect} from "react";
import {Grid, Segment} from "semantic-ui-react";

import ActivitiesItems from "./Activities.component";
import ActivityDetails from "./ActivityDetails.component";
import ActivityForm from "./ActivityForm.component";
import LoadingSpinner from "../../../app/layout/LoadingSpinner.component";

import {IActivity} from "../../../app/models/activity";
import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";


const ActivityDashboard = () => {
    const ActivityStore = useContext(activityStore);
    const {loadActivities, activities, loading, editMode, selectedActivity} = ActivityStore;

    // const [activities, setActivities] = useState<IActivity[]>([]);

    // const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    // const [editMode, setEditMode] = useState(false);
    // const [loading, setLoading] = useState(true);
    // const [submitting, setSubmitting] = useState(false);
    // const [target, setTarget] = useState('');

    useEffect(() => {
        loadActivities()
    }, [loadActivities]);

    const handleSelectActivity = (id: string) => {

    };

    const handleCreateActivity = (activity: IActivity) => {

    };

    const handleEditActivity = (activity: IActivity) => {

    };

    const handleDeleteActivity = (id: string, e: SyntheticEvent<HTMLButtonElement>) => {

    };

    if (loading) return <LoadingSpinner content={'Loading activities...'} inverted={true}/>;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={selectedActivity ? 10 : 16}>
                    <ActivitiesItems
                        activities={activities}
                        handleDeleteActivity={handleDeleteActivity}
                    />
                </Grid.Column>
                {selectedActivity && !editMode && (
                    <Grid.Column width={6}>
                        <ActivityDetails/>
                    </Grid.Column>
                )}
                {
                    editMode && (
                        <Grid.Column width={6}>
                            <ActivityForm
                                activity={selectedActivity}
                                handleEditActivity={handleEditActivity}
                            />
                        </Grid.Column>
                    )
                }
            </Grid>
        </Segment>)
};

export default observer(ActivityDashboard);

import React, {useEffect, useState} from "react";
import {Grid, Segment} from "semantic-ui-react";

import ActivitiesItems from "./Activities.component";
import ActivityDetails from "./ActivityDetails.component";
import ActivityForm from "./ActivityForm.component";
import {IActivity} from "../../../app/models/activity";
import Activities from "../../../app/api/agent";


const ActivityDashboard = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        Activities.list()
            .then(resp => {
                resp.forEach(a => {
                    a.date = a.date.split('.')[0];
                });
                setActivities(resp);
            })
            .catch(err => console.log(err))
    }, []);


    const handleSelectActivity = (id: string) => {
        setEditMode(false);
        setSelectedActivity(activities.filter(a => a.id === id)[0]);
    };

    const handleCreateActivity = (activity: IActivity) => {
        Activities.create(activity).then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        })
    };

    const handleEditActivity = (activity: IActivity) => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    };

    const handleDeleteActivity = (id: string) => {
        const someResp = activities.filter(a => a.id !== id);
        setActivities(someResp);
    };

    return (
        <Segment>
            <Grid>
                <Grid.Column width={selectedActivity ? 10 : 16}>
                    <ActivitiesItems
                        activities={activities}
                        selectActivity={handleSelectActivity}
                        handleDeleteActivity={handleDeleteActivity}
                    />
                </Grid.Column>
                {selectedActivity && !editMode && (
                    <Grid.Column width={6}>
                        <ActivityDetails
                            selectedActivity={selectedActivity}
                            editMode={editMode}
                            setEditMode={setEditMode}
                            setSelectedActivity={setSelectedActivity}
                        />
                    </Grid.Column>
                )}
                {
                    editMode && (
                        <Grid.Column width={6}>
                            <ActivityForm
                                editMode={editMode}
                                setEditMode={setEditMode}
                                activity={selectedActivity}
                                handleCreateActivity={handleCreateActivity}
                                handleEditActivity={handleEditActivity}
                            />
                        </Grid.Column>
                    )
                }
            </Grid>
        </Segment>
    )
};

export default ActivityDashboard;

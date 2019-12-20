import React, {useEffect, useState} from "react";
import {Grid, Segment} from "semantic-ui-react";

import Activities from "./Activities.component";
import ActivityDetails from "./ActivityDetails.component";
import ActivityForm from "./ActivityForm.component";
import {IActivity} from "../../../app/models/activity";
import axios from "axios";

const ActivityDashboard = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
            .then(resp => {
                setActivities(resp.data);
            })
            .catch(err => console.log(err))
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter(a => a.id === id)[0]);
    };

    return (
        <Segment>
            <Grid>
                <Grid.Column width={10}>
                    <Activities activities={activities} selectActivity={handleSelectActivity}/>
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

export default ActivityDashboard;

import React, {useEffect, useState} from "react";
import {Grid, Segment} from "semantic-ui-react";
import axios from "axios";

import Activities from "./Activities.component";
import ActivityDetails from "./ActivityDetails.component";
import ActivityForm from "./ActivityForm.component";

const ActivityDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/activities')
            .then(resp => {
                setActivities(resp.data);
            })
            .catch(err => console.log(err))
    }, []);

    const handleSelectActivity = (id) => {
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

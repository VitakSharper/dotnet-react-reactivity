import React, {useEffect, useState} from 'react';
import {Grid} from "semantic-ui-react";
import axios from 'axios';

import {IActivity} from "../models/activity";
import CardActivity from "./CardActivity.component";
import NavBar from "../../features/nav/NavBar.component";

const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
            .then(resp => {
                setActivities(resp.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <NavBar/>
            <Grid columns={4} relaxed>
                {
                    activities.map((activity) => (
                        <Grid.Column key={activity.id}>
                            <CardActivity activity={activity}/>
                        </Grid.Column>
                    ))
                }
            </Grid>
        </>
    );
};

export default App;

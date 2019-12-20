import React, {useEffect, useState} from "react";
import {Item, Segment} from "semantic-ui-react";

import ItemActivity from "../../../app/layout/ItemActivity.component";
import {IActivity} from "../../../app/models/activity";
import axios from "axios";

const ActivitiesItems = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
            .then(resp => {
                setActivities(resp.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Segment clearing>
            <Item.Group divided>
                {
                    activities.map((activity) => (
                        <ItemActivity activity={activity} key={activity.id}/>
                    ))
                }
            </Item.Group>
        </Segment>
    )
};

export default ActivitiesItems;

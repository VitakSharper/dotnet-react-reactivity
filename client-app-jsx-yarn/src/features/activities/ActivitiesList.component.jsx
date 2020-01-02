import React from "react";
import {Item, Segment} from "semantic-ui-react";

import ActivityItem from "./Activity.Item.component";

const ActivitiesList = ({activities, selectActivity}) => {

    if (!activities) return null;

    return (
        <Segment clearing>
            <Item.Group divided>
                {
                    activities.map((activity) => (
                        <ActivityItem
                            key={activity.id}
                            activity={activity}
                            selectActivity={selectActivity}
                        />
                    ))
                }
            </Item.Group>
        </Segment>
    )
};

export default ActivitiesList;

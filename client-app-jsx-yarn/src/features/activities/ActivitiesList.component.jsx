import React from "react";
import {Item, Segment} from "semantic-ui-react";

import ActivityItem from "./ActivityItem.component";

const ActivitiesList = ({activities, selectActivity}) => {

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
        </Segment>)
};

export default ActivitiesList;

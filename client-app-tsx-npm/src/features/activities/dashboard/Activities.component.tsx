import React from "react";
import {Item, Segment} from "semantic-ui-react";

import ActivityItem from "../../../app/layout/ActivityItem.component";
import {IActivity} from "../../../app/models/activity";

type IProps = {
    activities: IActivity[],
    selectActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
}

const ActivitiesItems: React.FC<IProps> = ({activities, selectActivity, handleDeleteActivity}) => {

    return (
        <Segment clearing>
            <Item.Group divided>
                {
                    activities.map((activity) => (
                        <ActivityItem
                            key={activity.id}
                            activity={activity}
                            selectActivity={selectActivity}
                            handleDeleteActivity={handleDeleteActivity}
                        />
                    ))
                }
            </Item.Group>
        </Segment>
    )
};

export default ActivitiesItems;

import React, {SyntheticEvent} from "react";
import {Item, Segment} from "semantic-ui-react";

import ActivityItem from "../../../app/layout/ActivityItem.component";
import {IActivity} from "../../../app/models/activity";

type IProps = {
    activities: IActivity[],
    selectActivity: (id: string) => void;
    handleDeleteActivity: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
    submitting: boolean;
    target: string;
}

const ActivitiesItems: React.FC<IProps> = ({activities, selectActivity, handleDeleteActivity, submitting, target}) => {

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
                            submitting={submitting}
                            target={target}
                        />
                    ))
                }
            </Item.Group>
        </Segment>
    )
};

export default ActivitiesItems;

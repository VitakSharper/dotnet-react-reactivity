import React, {useContext} from "react";
import {Item, Segment} from "semantic-ui-react";

import ActivityItem from "../../../app/layout/ActivityItem.component";
import {IActivity} from "../../../app/models/activity";
import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";

type IProps = {
    activities: IActivity[]
}

const ActivitiesItems: React.FC<IProps> = ({activities}) => {
    const ActivityStore = useContext(activityStore);
    const {target, submitting, selectActivity, deleteActivity} = ActivityStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map((activity) => (
                    <ActivityItem
                        key={activity.id}
                        activity={activity}
                        selectActivity={selectActivity}
                        submitting={submitting}
                        target={target}
                        deleteActivity={deleteActivity}
                    />))}
            </Item.Group>
        </Segment>)
};

export default observer(ActivitiesItems);

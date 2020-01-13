import React, {useContext} from "react";
import {Item, Segment} from "semantic-ui-react";
import {useHistory} from 'react-router-dom';

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

    const history = useHistory();

    const handleView = (activityId: string) => {
        // selectActivity(activityId);
        history.push(`/activities/${activityId}`)

    };
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map((activity) => (
                    <ActivityItem
                        key={activity.id}
                        activity={activity}
                        submitting={submitting}
                        target={target}
                        deleteActivity={deleteActivity}
                        handleView={handleView}
                    />))}
            </Item.Group>
        </Segment>)
};

export default observer(ActivitiesItems);

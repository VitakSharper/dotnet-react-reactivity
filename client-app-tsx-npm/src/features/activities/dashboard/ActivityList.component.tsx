import React, {useContext, Fragment} from "react";
import {Item, Segment, Label} from "semantic-ui-react";
import {useHistory} from 'react-router-dom';

import ActivityItem from "../../../app/layout/ActivityItem.component";
import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";

const ActivityList = () => {
    const ActivityStore = useContext(activityStore);
    const {target, submitting, deleteActivity, activitiesByDate} = ActivityStore;

    const history = useHistory();

    const handleView = (activityId: string) => {
        // selectActivity(activityId);
        history.push(`/activities/${activityId}`)
    };
    return (
        <>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Segment.Group>
                        <Segment clearing style={{background: '#E3F2FD'}}>
                            <Label size={'large'} color={'blue'} ribbon>{group}</Label>
                            <Item.Group>
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
                        </Segment>
                    </Segment.Group>
                </Fragment>
            ))}
        </>
    )
};

export default observer(ActivityList);

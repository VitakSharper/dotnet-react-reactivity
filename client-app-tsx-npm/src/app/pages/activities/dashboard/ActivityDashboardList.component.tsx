import React, {useContext, Fragment} from "react";
import {Item, Segment, Label} from "semantic-ui-react";
import {useHistory} from 'react-router-dom';

import ActivityDashboardItem from "../../../components/ActivityDashboardItem.component";
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/Root.store";
import {format} from "date-fns";

const styles = {
    activityListSegment: {
        background: '#E3F2FD',
        padding: 0
    }
};

const ActivityDashboardList = () => {
    const rootStore = useContext(RootStoreContext);
    const {activityStore: {target, submitting, deleteActivity, activitiesByDate}} = rootStore;

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
                        <Segment clearing style={styles.activityListSegment}>
                            <Label size={'large'} color={'blue'} ribbon>
                                {format(group, 'eeee do MMM')}</Label>
                            <Item.Group>
                                {activities.map((activity) => (
                                    <ActivityDashboardItem
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

export default observer(ActivityDashboardList);

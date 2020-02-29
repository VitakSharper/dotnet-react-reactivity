import React, {useContext, Fragment} from "react";
import {Item, Segment, Label} from "semantic-ui-react";
import {useHistory} from 'react-router-dom';

import ActivityDashboardItem from "./ActivityDashboardItem.component";
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/Root.store";
import {format} from "date-fns";



const ActivityDashboardList = () => {
    const rootStore = useContext(RootStoreContext);
    const {activitiesByDate} = rootStore.activityStore;
    const history = useHistory();

    const handleView = (activityId: string) => {
        history.push(`/activities/${activityId}`)
    };

    return (
        <>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Segment.Group>
                        <Segment clearing>
                            <Label size={'large'} color={'blue'} ribbon>
                                {format(group, 'eeee do MMM')}</Label>
                            <Item.Group>
                                {activities.map((activity) => (
                                    <ActivityDashboardItem
                                        key={activity.id}
                                        activity={activity}
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

import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Grid, Segment} from "semantic-ui-react";

import ActivityDetailedHeader from "./ActivityDetailedHeader.component";
import ActivityDetailedInfo from "./ActivityDetailedInfo.component";
import ActivityDetailedChat from "./ActivityDetailedChat.component";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar.component";
import activityStore from "../store/Activity.store";

const styles = {
    groupSegment: {
        background: '#E0F2F1'
    }
};

const ActivityDetailGrid = () => {
    const ActivityStore = useContext(activityStore);
    const {activity} = ActivityStore;


    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment style={styles.groupSegment}>
                    <ActivityDetailedHeader activity={activity}/>
                    <ActivityDetailedInfo activity={activity}/>
                    <ActivityDetailedChat/>
                </Segment>
            </Grid.Column>

            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDetailGrid);
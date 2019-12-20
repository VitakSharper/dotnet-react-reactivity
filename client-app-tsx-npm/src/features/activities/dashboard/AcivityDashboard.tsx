import React from "react";
import ActivitiesItems from "./ActivitiesItems.component";
import {Grid} from "semantic-ui-react";


const ActivityDashboard = () => {

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivitiesItems/>
            </Grid.Column>
        </Grid>
    )
};

export default ActivityDashboard;

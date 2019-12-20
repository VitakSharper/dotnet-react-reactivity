import React from "react";

import ActivityCard from "../../../app/layout/ActivityCard.component";
import {IActivity} from "../../../app/models/activity";

type IProps = {
    selectedActivity: IActivity
}

const ActivityDetails: React.FC<IProps> = ({selectedActivity}) => {
    return (
        <>
            <ActivityCard selectedActivity={selectedActivity}/>
        </>
    )
};

export default ActivityDetails;

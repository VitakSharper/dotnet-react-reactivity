import React from "react";

import ActivityCard from "./ActivityCard.component";

const ActivityDetails = ({selectedActivity}) => {
    return (
        <>
            <ActivityCard selectedActivity={selectedActivity}/>
        </>
    )
};

export default ActivityDetails;

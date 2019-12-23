import React from "react";

import ActivityCard from "../../../app/layout/ActivityCard.component";
import {IActivity} from "../../../app/models/activity";

type IProps = {
    selectedActivity: IActivity;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({selectedActivity, editMode, setEditMode, setSelectedActivity}) => {
    return (
        <>
            <ActivityCard
                selectedActivity={selectedActivity}
                setEditMode={setEditMode}
                editMode={editMode}
                setSelectedActivity={setSelectedActivity}
            />
        </>
    )
};

export default ActivityDetails;

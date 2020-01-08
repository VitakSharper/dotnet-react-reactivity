import React, {useContext} from "react";

import ActivityCard from "../../../app/layout/ActivityCard.component";
import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";

const ActivityDetails = () => {
    const ActivityStore = useContext(activityStore);
    const {editMode, selectedActivity, setEditMode, setSelectedActivity} = ActivityStore;
    return (
        <>
            <ActivityCard
                selectedActivity={selectedActivity}
                editMode={editMode}
                setEditMode={setEditMode}
                setSelectedActivity={setSelectedActivity}
            />
        </>
    )
};

export default observer(ActivityDetails);

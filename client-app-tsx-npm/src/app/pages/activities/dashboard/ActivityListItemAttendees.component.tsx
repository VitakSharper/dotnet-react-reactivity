import React from "react";
import {List, Image} from "semantic-ui-react";
import {IAttendee} from "../../../models/activity";
import {observer} from "mobx-react-lite";

interface IProps {
    attendees: IAttendee[];
}

const ActivityListItemAttendees: React.FC<IProps> = ({attendees}) => {
    console.log('attend: ', attendees);
    return (
        <List horizontal>
            {
                attendees.map((a, idx) => (
                    <List.Item key={idx}>
                        <Image size={"mini"} circular src={a.image || '/assets/user.png'}/>
                    </List.Item>
                ))
            }
        </List>
    )
};

export default observer(ActivityListItemAttendees);

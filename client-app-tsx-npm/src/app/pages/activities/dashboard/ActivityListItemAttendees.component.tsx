import React from "react";
import {List, Image, Popup} from "semantic-ui-react";
import {IAttendee} from "../../../models/activity";
import {observer} from "mobx-react-lite";

interface IProps {
    attendees: IAttendee[];
}

const ActivityListItemAttendees: React.FC<IProps> = ({attendees}) => {
    return (
        <List horizontal>
            {
                attendees.map((a, idx) => (
                    <List.Item key={idx}>
                        <Popup
                            inverted
                            header={a.displayName}
                            trigger={<Image size={"mini"} circular src={a.image || '/assets/user.png'}/>
                            }
                        />
                    </List.Item>
                ))
            }
        </List>
    )
};

export default observer(ActivityListItemAttendees);

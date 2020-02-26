import React from "react";
import {List, Image, Popup} from "semantic-ui-react";
import {IAttendee} from "../../models/activity";
import {observer} from "mobx-react-lite";

interface IProps {
    attendees: IAttendee[];
}

const styles = {
    isFollowing: {
        borderColor: '#FFA726',
        borderWidth: '2'
    }
};

const ActivityListItemAttendees: React.FC<IProps> = ({attendees}) => {
    return (
        <List horizontal>
            {
                attendees.map((a, idx) => (
                    <List.Item key={idx}>
                        <Popup
                            inverted
                            content={a.following
                                ? `You are following ${a.displayName[0].toUpperCase()}${a.displayName.substring(1).toLowerCase()}`
                                : `${a.displayName[0].toUpperCase()}${a.displayName.substring(1).toLowerCase()}`}
                            trigger={
                                <Image
                                    size={"mini"} circular bordered
                                    style={a.following ? styles.isFollowing : null}
                                    src={a.image || '/assets/user.png'}/>
                            }
                        />
                    </List.Item>
                ))
            }
        </List>
    )
};

export default observer(ActivityListItemAttendees);
